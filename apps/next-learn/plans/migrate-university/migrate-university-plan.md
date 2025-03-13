see: `./llms-full.txt` for context

### Step 1: Update the Database Schema

**Objective:** Extend the provided Drizzle schema to include the `resourceProgress` table for tracking user progress on content resources.

**Instructions:**

1. **Define the `resourceProgress` Table:**

   - This table will link users to content resources and track their progress.
   - Add it to `src/lib/schema.ts` with the following definition:

   ```typescript
   import {
   	pgTable,
   	serial,
   	text,
   	varchar,
   	boolean,
   	doublePrecision,
   	timestamp,
   	index,
   } from 'drizzle-orm/pg-core'

   export const resourceProgress = pgTable(
   	'resource_progress',
   	{
   		id: serial('id').primaryKey(),
   		userId: text('user_id')
   			.notNull()
   			.references(() => users.id),
   		resourceId: varchar('resource_id', { length: 255 })
   			.notNull()
   			.references(() => contentResource.id),
   		isComplete: boolean('is_complete').default(false),
   		progressPercent: doublePrecision('progress_percent').default(0),
   		updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
   	},
   	(table) => [
   		index('user_id_idx').on(table.userId),
   		index('resource_id_idx').on(table.resourceId),
   	],
   )
   ```

   - **Fields Explained:**
     - `id`: Unique identifier for each progress record.
     - `userId`: Links to the `users` table’s `id`.
     - `resourceId`: Links to the `contentResource` table’s `id`.
     - `isComplete`: Tracks if the resource is fully completed.
     - `progressPercent`: Stores progress as a percentage (0-100).
     - `updatedAt`: Records the last update time.

2. **Localization Handling:**
   - The `contentResource` table uses a `fields` JSONB column. For localized data (e.g., titles in multiple languages), store it like this: `{ "title": { "en": "Title", "ja": "タイトル" } }`.
   - No additional tables are needed unless you require a more complex localization structure.

**Next Steps:** Apply this schema change using Drizzle’s migration tools (e.g., `drizzle-kit`) and verify the table structure in your database.

---

### Step 2: Migrate Data Fetching Logic

**Objective:** Update server-side logic to work with the new schema using Drizzle ORM.

**Instructions:**

1. **Fetch Content Resources by Type:**

   - Since `contentResource` unifies modules, sections, and lessons, filter by the `type` field.
   - Example function to fetch modules (`type: 'module'`):

   ```typescript
   import { db } from '@/lib/db' // Your Drizzle DB instance
   import { contentResource } from '@/lib/schema'
   import { eq } from 'drizzle-orm'

   export const getModules = async (locale: string = 'en') => {
   	try {
   		const result = await db
   			.select()
   			.from(contentResource)
   			.where(eq(contentResource.type, 'module'))
   			.orderBy(contentResource.createdAt.desc())
   			.limit(100)
   		return result
   	} catch (error) {
   		console.error('Error fetching modules:', error)
   		return []
   	}
   }
   ```

2. **Fetch Hierarchical Relationships:**

   - Use the `contentResourceResource` table to get related resources (e.g., sections within a module).
   - Example function:

   ```typescript
   import { contentResourceResource } from '@/lib/schema'

   export const getSectionsByModuleId = async (moduleId: string, locale: string = 'en') => {
   	try {
   		const result = await db
   			.select({ contentResource })
   			.from(contentResource)
   			.innerJoin(
   				contentResourceResource,
   				eq(contentResourceResource.resourceId, contentResource.id),
   			)
   			.where(
   				and(
   					eq(contentResourceResource.resourceOfId, moduleId),
   					eq(contentResource.type, 'section'),
   				),
   			)
   			.orderBy(contentResourceResource.position)
   		return result.map((r) => r.contentResource)
   	} catch (error) {
   		console.error(`Error fetching sections for module "${moduleId}":`, error)
   		return []
   	}
   }
   ```

3. **Fetch User Progress:**

   - Query the `resourceProgress` table to retrieve progress data.
   - Example function:

   ```typescript
   import { resourceProgress } from '@/lib/schema'

   export const getProgressForUserAndResource = async (userId: string, resourceId: string) => {
   	try {
   		const result = await db
   			.select()
   			.from(resourceProgress)
   			.where(
   				and(eq(resourceProgress.userId, userId), eq(resourceProgress.resourceId, resourceId)),
   			)
   			.limit(1)
   		return result[0] || null
   	} catch (error) {
   		console.error(
   			`Error fetching progress for user "${userId}" and resource "${resourceId}":`,
   			error,
   		)
   		return null
   	}
   }
   ```

**Next Steps:** Test these functions to ensure they return the expected data from the new schema.

---

### Step 3: Update Frontend Components

**Objective:** Adapt the frontend to handle the new data structure from `contentResource` and `resourceProgress`.

**Instructions:**

1. **Access Localized Fields:**

   - Extract data from the `fields` JSONB column based on the desired locale.
   - Example in a React component:

   ```typescript
   const ModuleTitle = ({ module, locale = 'en' }) => {
     const title = module.fields.title?.[locale] || module.fields.title?.en || 'Untitled';
     return <h1>{title}</h1>;
   };
   ```

2. **Handle Resource Types:**

   - Check the `type` field to render UI appropriately (e.g., different layouts for modules vs. lessons).
   - Example:

   ```typescript
   const ResourceDisplay = ({ resource }) => {
     if (resource.type === 'module') {
       return <div>Module: {resource.fields.title?.en}</div>;
     } else if (resource.type === 'lesson') {
       return <div>Lesson: {resource.fields.title?.en}</div>;
     }
     return null;
   };
   ```

**Next Steps:** Update all relevant components and test the UI with sample data.

---

### Step 4: Implement Progress Tracking

**Objective:** Add server-side and client-side functionality to track and update user progress.

**Instructions:**

1. **Create a Progress Update Function:**

   - Insert or update progress records in `resourceProgress`.
   - Example server action:

   ```typescript
   export async function markResourceComplete(userId: string, resourceId: string) {
   	try {
   		await db
   			.insert(resourceProgress)
   			.values({
   				userId,
   				resourceId,
   				isComplete: true,
   				progressPercent: 100,
   				updatedAt: new Date(),
   			})
   			.onConflictDoUpdate({
   				target: [resourceProgress.userId, resourceProgress.resourceId],
   				set: { isComplete: true, progressPercent: 100, updatedAt: new Date() },
   			})
   	} catch (error) {
   		console.error(`Error marking resource "${resourceId}" complete for user "${userId}":`, error)
   	}
   }
   ```

2. **Integrate with the Frontend:**

   - Add a button to trigger progress updates.
   - Example in a React component:

   ```typescript
   const LessonCompleteButton = ({ userId, resourceId }) => {
     const handleComplete = async () => {
       await fetch('/api/mark-complete', {
         method: 'POST',
         body: JSON.stringify({ userId, resourceId }),
       });
     };
     return <button onClick={handleComplete}>Mark as Complete</button>;
   };
   ```

**Next Steps:** Test progress updates to ensure they save correctly and reflect in the UI.

---

### Step 5: Test the Migrated Application

**Objective:** Validate that the application works fully with the new schema.

**Instructions:**

1. **Seed the Database:**

   - Add sample data to `contentResource` (e.g., modules, sections, lessons), `contentResourceResource` (relationships), and `resourceProgress`.
   - Example seed script snippet:

   ```typescript
   await db.insert(contentResource).values([
   	{ id: 'module1', type: 'module', fields: { title: { en: 'Module 1' } } },
   	{ id: 'section1', type: 'section', fields: { title: { en: 'Section 1' } } },
   ])
   await db
   	.insert(contentResourceResource)
   	.values([{ resourceOfId: 'module1', resourceId: 'section1', position: 1 }])
   ```

2. **Test Key Features:**
   - Confirm that content resources display correctly in the UI.
   - Verify that hierarchical relationships (e.g., sections within modules) work.
   - Test progress tracking by marking resources complete and checking the database.

**Next Steps:** Address any issues found during testing and deploy the updated application.

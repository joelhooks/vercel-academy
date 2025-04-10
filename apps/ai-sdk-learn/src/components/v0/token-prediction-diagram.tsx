import { ArrowRight, Brain } from "lucide-react"

export function TokenPredictionDiagram() {
  return (
    <div className="bg-black text-white rounded-lg p-6 my-8 overflow-hidden">
      <h3 className="text-lg font-medium mb-6">Token Prediction Process</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-sm text-zinc-400 mb-2">1. Input Prompt:</div>
            <div className="text-lg font-mono">Why did the...</div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* LLM Prediction Section */}
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-2">
            <div className="bg-primary/20 rounded-full p-3 mb-3">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm text-zinc-400 text-center">2. LLM Predicts Next Token</div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono">"developer"</span>
                <span className="text-green-400">50%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">"chicken"</span>
                <span className="text-yellow-400">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">"React component"</span>
                <span className="text-blue-400">10%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">[other options]</span>
                <span className="text-zinc-400">20%</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-sm text-zinc-400 mb-3">3. Selects Highest Probability:</div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="font-mono">"developer"</div>
              <ArrowRight className="h-4 w-4 text-green-400" />
              <div className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-sm font-medium">Selected</div>
            </div>

            <div className="border-t border-zinc-700 pt-4 mt-2">
              <div className="text-sm text-zinc-400 mb-2">4. Updated Prompt:</div>
              <div className="text-lg font-mono">Why did the developer...</div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 text-center text-zinc-400 text-sm">
            Process repeats for each token until completion
          </div>
        </div>
      </div>

      <div className="text-sm text-zinc-400 mt-6 pt-4 border-t border-zinc-800">
        <p>
          This visualization shows how LLMs predict text token by token. The model calculates probabilities for each
          possible next token based on patterns learned during training, selects the most likely one, and then repeats
          the process for the next token.
        </p>
      </div>
    </div>
  )
}

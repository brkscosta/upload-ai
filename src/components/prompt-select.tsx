import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type Prompt = {
  id: string
  template: string
  title: string
}

interface IPromptSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: IPromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>()

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  useEffect(() => {
    api.get('/api/v1/prompts').then((response) => {
      setPrompts(response.data)
    })
  }, [])

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt, index) => (
          <SelectItem key={index} value={prompt.id}>
            {' '}
            {prompt.title}{' '}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

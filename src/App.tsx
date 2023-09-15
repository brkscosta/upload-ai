import { FileVideo, Github, Upload, Wand2 } from "lucide-react"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Separator } from "./components/ui/separator"
import { Slider } from "./components/ui/slider"
import { Textarea } from "./components/ui/textarea"

export function App() {
  return (
    <body className="min-h-screen flex flex-col" >

      <header className="px-6 py-3 flex items-center justify-between border-b" >

        <h1 className="text-xl font-bold" >upload.ui</h1>

        <div className="flex items-center gap-3" >
          <span className="text-small text-muted-foreground" >Desenvolvido com ❤️ no NLW</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant={"outline"} >
            <Github className="w-4 h-4 mr-2" />
            GitHub
            </Button>
        </div>

      </header>

      <main className="flex-1 p-3 flex gap-6" >

        <div className="flex flex-col flex-1 gap-4" >

          <div className="grid grid-rows-2 gap-4 flex-1" >
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para IA..."
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA..."
                readOnly
              />
          </div>

          <p className="text-small text-muted-foreground" >
            Lembre-se você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo de transcrição do vídeo selecionado.
          </p>

        </div>

        <aside className="w-80 space-y-6" >

          <form className="space-y-6" >

            <label
              className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
              htmlFor="video">
              <FileVideo className="w-5 h-5"
            />
              Selecione o seu vídeo aqui
            </label>

            <Separator />

            <div className="space-y-2" >
              <Label htmlFor="transcription_prompt" >Prompt de transcrição</Label>
              <Textarea
                id="transcription_prompt"
                className="h-10 leading-relaxed resize-none"
                placeholder="inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
            >
              Carregar vídeo
              <Upload className="w-5 h-5" />
            </Button>

            <input type="file" id="video" accept="video/mp4" className="sr-only" />

          </form>

          <Separator />

          <form className="space-y-4" >

            <div className="space-y-2" >

              <Label>
                Prompt
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título do YouTube</SelectItem>
                  <SelectItem value="description">Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2" >

              <Label>
                Modelo
              </Label>

              <Select disabled defaultValue="gpt3.5" >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5" >GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic" >
                Você poderá customizar essa opção em breve
              </span>

            </div>

            <Separator />

            <div className="space-y-4" >

              <Label>
                Temperatura
              </Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
              />

              <span className="block text-xs text-muted-foreground italic leading-relaxed" >
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros
              </span>

            </div>

            <Separator />

            <Button type="submit" className="w-full gap-2" >
              Executar
              <Wand2 className="w-5 h-5" />
            </Button>

          </form>

        </aside>

      </main>

    </body>
  )
}

export default App

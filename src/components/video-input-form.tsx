import { api } from '@/lib/axios'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-select'
import { AxiosError, AxiosResponse } from 'axios'
import { FileVideo, Upload } from 'lucide-react'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

type Status =
  | 'waiting'
  | 'converting'
  | 'uploading'
  | 'generating'
  | 'success'
  | 'error'

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!',
  error: 'Algo não ocorreu bem',
}

interface IVideoInputForm {
  onVideoUploaded: (videoId: string) => void
}

export function VideoInputForm(props: IVideoInputForm) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState<Status>('waiting')

  function handleInputFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', (progress) => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Convert Fineshed')

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      setStatus('error')
      return
    }

    setStatus('converting')

    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    if(!audioFile) {
      console.log('The audio file is null')
      setStatus('error')
      return
    }

    data.append('file', audioFile)

    setStatus('uploading')

    let videoId = ""
    await api.post('/api/v1/videos', data)
    .then((response: AxiosResponse) => {
      videoId = response.data.id
      props.onVideoUploaded(videoId)
    }).catch((reason: AxiosError) => {
      console.error(reason.message)
      setStatus('error')
    })

    setStatus('generating')

    await api.post(`/api/v1/videos/${videoId}/transcription`, {
      prompt,
    }).then(response => {
      console.log(response)
      setStatus('success')
    })
    .catch((reason: AxiosError) => {
      console.log(reason.message)
      setStatus('error')
    })
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-6" onSubmit={handleUploadVideo}>
      <label
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
        htmlFor="video"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          ></video>
        ) : (
          <>
            <FileVideo className="w-5 h-5" />
            Selecione o seu vídeo aqui
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleInputFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          disabled={status !== 'waiting'}
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button
        data-success={status !== 'success'}
        data-error={status === 'error'}
        disabled={status !== 'waiting'}
        type="submit"
        className="w-full gap-2 data-[success=true]:bg-emerald-400 data-[error=true]:bg-red-500"
      >
        {status === 'waiting' ? (
          <>
            Carregar vídeo
            <Upload className="w-5 h-5" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />
    </form>
  )
}

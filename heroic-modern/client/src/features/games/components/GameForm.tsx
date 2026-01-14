import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CreateGameInput, Game } from '@/types'

const gameSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  coverUrl: z.string().url('Please enter a valid URL'),
  description: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: z.string().optional(),
})

type GameFormData = z.infer<typeof gameSchema>

interface GameFormProps {
  game?: Game
  onSubmit: (data: CreateGameInput) => Promise<void>
  isLoading?: boolean
}

export function GameForm({ game, onSubmit, isLoading }: GameFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: game?.title || '',
      coverUrl: game?.coverUrl || '',
      description: game?.description || '',
      developer: game?.developer || '',
      publisher: game?.publisher || '',
      releaseDate: game?.releaseDate || '',
    },
  })

  const coverUrl = watch('coverUrl')

  const handleFormSubmit = async (data: GameFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter game title"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL *</Label>
            <Input
              id="coverUrl"
              placeholder="https://example.com/cover.jpg"
              {...register('coverUrl')}
            />
            {errors.coverUrl && (
              <p className="text-sm text-destructive">{errors.coverUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Game description..."
              rows={4}
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="developer">Developer</Label>
              <Input
                id="developer"
                placeholder="Developer name"
                {...register('developer')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                placeholder="Publisher name"
                {...register('publisher')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date</Label>
            <Input
              id="releaseDate"
              type="date"
              {...register('releaseDate')}
            />
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cover Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="w-full aspect-[3/4] object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/300x400?text=Invalid+URL'
                  }}
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
                  Enter a URL to preview
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : game ? 'Update Game' : 'Add Game'}
      </Button>
    </form>
  )
}

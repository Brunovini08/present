'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import YouTubeAudioPlayer from './YoutubePlayer'
import pizzaria from '../../public/pizzaria.jpeg'
import praca from '../../public/praca.jpeg'
import roda_gigante from '../../public/roda-gigante.jpeg'
import shpping from '../../public/shpping.jpeg'
import churrasco from '../../public/churrasco.jpeg'

export default function Present() {
    let formData = {
        yourName: 'Bruno',
        partnerName: 'Ana',
        message: 
        'Obrigado por esse primeiro ano de relacionamento meu amooor, obrigado por cada momento, cada abraço, cada beijo, você é a pessoa mais incrível e especial na minha vidaaa, eu te amooooooo mil milhões meu amoooor 💖',
        youtubeUrl: 'https://www.youtube.com/watch?v=kPa7bsKwL-c',
        startDate: '2023-11-14',
    }

    const images = [pizzaria, churrasco, roda_gigante, shpping]

    const day = new Date(formData.startDate).toLocaleString('pt-BR', { day: 'numeric' })
    const dayFormat = parseInt(day) + 1
    const today = new Date()
    const startDate = new Date(formData.startDate)
    const diference = today.getTime() - startDate.getTime()
    const days = Math.floor(diference / (1000 * 60 * 60 * 24))

    const [selectedImage, setSelectedImage] = useState<any>(images[0])

    const videoId = formData.youtubeUrl.split('watch?v=')[1]

    useEffect(() => {
        if (formData.youtubeUrl && formData.youtubeUrl.includes('watch?v=')) {
            const videoId = formData.youtubeUrl.split('watch?v=')[1]
            formData.youtubeUrl = videoId
        }
    }, [formData.youtubeUrl])

    return (
        <div className='w-full flex justify-center p-4'>
            <Card className="bg-gradient-to-r from-red-400 to-purple-500 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <CardContent className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-white bg-clip-text mb-4 sm:mb-6">
                        Nosso Álbum de Amor
                    </h2>

                    {/* Main Photo Display */}
                    <div className="relative aspect-video mb-4 bg-gray-50 rounded-lg overflow-hidden">
                        {selectedImage ? (
                            <Image src={selectedImage} alt="Main Photo" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-pink-200" />
                            </div>
                        )}
                    </div>

                    {/* Photo Gallery */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <Image
                                        src={image}
                                        alt={`Photo ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Names Display */}
                    {(formData.yourName || formData.partnerName) && (
                        <div className="text-center mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">
                                {formData.yourName} {formData.yourName && formData.partnerName && '❤️'} {formData.partnerName}
                            </h3>
                        </div>
                    )}

                    {/* Message Display */}
                    {formData.message && (
                        <div className="bg-pink-50 rounded-lg p-3 sm:p-4 mb-4">
                            <p className="text-sm sm:text-base text-gray-700 italic">{formData.message}</p>
                        </div>
                    )}

                    {/* YouTube Embed */}
                    {formData.youtubeUrl && (
                        <div className="mb-4">
                            <YouTubeAudioPlayer videoId={formData.youtubeUrl} />
                        </div>
                    )}

                    {formData.startDate && (
                        <div className="w-full flex flex-col justify-center gap-4">
                            <div className="text-center mt-4 flex flex-wrap justify-center items-center gap-2">
                                <div className="gap-2 flex flex-col sm:flex-row">
                                    <div className="w-28 sm:w-32 h-16 backdrop-blur-sm bg-white/20 rounded-md font-mono justify-center flex items-center flex-col">
                                        <h1 className="text-center font-bold text-white text-lg sm:text-xl">{dayFormat}</h1>
                                        <h2 className="text-center font-bold text-white text-xs sm:text-sm">Dia</h2>
                                    </div>
                                    <div className="w-28 sm:w-32 h-16 backdrop-blur-sm bg-white/20 rounded-md font-mono flex items-center justify-center flex-col">
                                        <h1 className="text-center font-bold text-white text-lg sm:text-xl">{new Date(formData.startDate).getFullYear()}</h1>
                                        <h2 className="text-center font-bold text-white text-xs sm:text-sm">Ano</h2>
                                    </div>
                                </div>
                                <div className="gap-2 flex flex-col sm:flex-row">
                                    <div className="w-28 sm:w-32 h-16 backdrop-blur-sm bg-white/20 rounded-md font-mono flex items-center justify-center flex-col">
                                        <h1 className="text-center font-bold text-white text-lg sm:text-xl">{new Date(formData.startDate).toLocaleString('pt-BR', { month: 'long' })}</h1>
                                        <h2 className="text-center font-bold text-white text-xs sm:text-sm">Mês</h2>
                                    </div>
                                    <div className="w-28 sm:w-32 h-16 backdrop-blur-sm bg-white/20 flex justify-center rounded-md items-center flex-col">
                                        <h1 className="text-center font-bold text-white text-lg sm:text-xl">{days}</h1>
                                        <h2 className="text-center font-bold text-white text-xs sm:text-sm">Dias</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
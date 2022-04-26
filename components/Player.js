import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'
import { isPlayingState, currentTrackIdState } from '../atoms/playlistAtom'
import { useEffect } from 'react/cjs/react.development'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()
  console.log('SONG INFO', songInfo)

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('PLAYING: ', data.body?.item)
        setCurrentIdTrack(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  })

  return (
    <div className="h-24 text-white bg-gradient-to-b from-black to-gray-900">
      <div className="flex">
        <img src={songInfo?.album?.images?.[0]?.url} alt="" className="h-10 w-10" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists[0]?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Player

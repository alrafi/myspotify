import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

const Song = ({ track, order }) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    // spotifyApi.play({
    //   uris: [track.uri],
    // })
  }

  return (
    <>
      <div
        className="grid grid-cols-2 hover:bg-gray-900 hover:opacity-90 rounded-lg cursor-pointer px-4 py-2"
        onClick={playSong}
      >
        <div className="flex items-center space-x-4">
          <p className="w-4">{order}</p>
          <img src={track?.album?.images[2]?.url} className="h-10 w-10" alt="" />
          <div className="">
            <p className="font-medium w-36 lg:w-64 xl:w-96 truncate">{track?.name}</p>
            <p className="text-sm">{track?.artists[0]?.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="w-40 lg:w-64 xl:w-80 truncate hidden md:inline">{track?.album?.name}</p>
          <p className="">{millisToMinutesAndSeconds(track?.duration_ms)}</p>
        </div>
      </div>
    </>
  )
}

export default Song

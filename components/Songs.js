import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import { millisToMinutesAndSeconds } from '../lib/time'

const Songs = () => {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className="p-8">
      {playlist?.tracks.items.map((song, idx) => {
        return (
          <div className="grid grid-cols-2 hover:bg-gray-900 hover:opacity-90 rounded-lg cursor-pointer px-4 py-2">
            <div className="flex items-center ">
              <p className="">{idx + 1}</p>
              <img src={song.track.album.images[2].url} className="h-10 w-10 mx-4" alt="" />
              <div className="">
                <p className="font-medium w-36 lg:w-64 xl:w-96 truncate">{song.track.name}</p>
                <p className="text-sm">{song.track.artists[0].name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
              <p className="w-40 lg:w-64 xl:w-80 truncate hidden md:inline">{song.track.album.name}</p>
              <p className="">{millisToMinutesAndSeconds(song.track.duration_ms)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Songs

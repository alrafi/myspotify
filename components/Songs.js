import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from '../components/Song'

const Songs = () => {
  const playlist = useRecoilValue(playlistState)
  // console.log('PLAYLIST CLICKED', playlist)

  return (
    <div className="p-8">
      {playlist?.tracks.items.map((song, idx) => {
        return <Song track={song.track} order={idx + 1} />
      })}
    </div>
  )
}

export default Songs

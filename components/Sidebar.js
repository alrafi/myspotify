import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon, CollectionIcon, PlusIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  console.log('playlist now: ', playlistId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  console.log(playlists)

  return (
    <div className="bg-black p-5 text-gray-400 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:inline-block text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] pb-28">
      <div className="">
        <div className="space-y-4">
          <button className="flex items-center space-x-4 hover:text-white transition duration-300">
            <HomeIcon className="w-6 h-6" />
            <p className="font-bold">Home</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white transition duration-300">
            <SearchIcon className="w-6 h-6" />
            <p className="font-bold">Search</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white transition duration-300">
            <CollectionIcon className="w-6 h-6" />
            <p className="font-bold">Your Library</p>
          </button>
        </div>
        <div className="space-y-4 mt-10">
          <button className="flex items-center space-x-4 hover:text-white transition duration-300">
            <div className="w-6 h-6 rounded-sm bg-gray-400 flex justify-center items-center">
              <PlusIcon className="w-4 h-4 text-gray-900" />
            </div>
            <p className="font-bold">Create Playlist</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white transition duration-300">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-r from-indigo-500 to-gray-400 flex justify-center items-center">
              <HeartIcon className="w-4 h-4 text-gray-100" />
            </div>
            <p className="font-bold">Liked Songs</p>
          </button>
        </div>
        <hr className="border-t-[0.1px] border-gray-900 mt-4" />
        <div className="mt-8 space-y-3">
          {playlists.map((playlist) => {
            return (
              <p
                key={playlist.id}
                onClick={() => setPlaylistId(playlist.id)}
                className="hover:text-white cursor-pointer"
              >
                {playlist.name}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

import chat from '../component/chat/network.js'
import message from '../component/message/network.js'
import user from '../component/user/network.js'
import express from 'express'
export const routes= function(server){
    server.use('/message', message)
    server.use('/user', user)
    server.use('/chat',chat)
    server.use('/app', express.static('public'))
}

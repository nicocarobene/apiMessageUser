import message from '../component/message/network.js'
import user from '../component/user/network.js'

export const routes= function(server){
    server.use('/message', message)
    server.use('/user', user)
}

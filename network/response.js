export const success = function(req, resp, message, status){
    resp.status(status || 200).send({
        error: '',
        body: message
    });
}

export const error = function(req, resp, message, status, details){
    console.log('[response error]', details)
    resp.status(status || 400).send({
        error: message,
        body: ''
    });
}
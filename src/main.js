import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve } from 'path';
import { parse } from 'querystring';

const server = createServer((request, response) => {
    switch(request.url){
        case '/status': {
            response.writeHead(200 , {
                'Content-Type': 'application/json',
            });
            response.write(
                JSON.stringify({
                    status: 'OKAY',
                })
            );
            response.end();
            break;
        }
        case '/login': {
            const filePath = resolve(__dirname,'./pages/login.html');
            readFile(filePath, (error,file) => {
                if(error){
                    response.writeHead(500 , 'Can\'t process HTML file');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            })
            break;
        }
        case '/home':{
            const filePath = resolve(__dirname,'./pages/home.html');
            readFile(filePath, (error,file) => {
                if(error){
                    response.writeHead(500 , 'Can\'t process HTML file');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            })
            break;           
        }
        case '/authenticate':{
            let data = '';
            request.on('data',(chunk) =>{
                data+= chunk;
            });
            request.on('end',() => {
                response.writeHead(301 ,{
                    Location: '/home',
                });
                response.end();                
            });
            break;
        }
        default: {
            response.writeHead(404, 'Service not found');
            response.end();
        }
    }
});

const PORT = process.env.PORT ? parseInt( process.env.PORT ) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(8000,'127.0.0.1',() => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
})
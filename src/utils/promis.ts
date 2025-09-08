export const promisifiedFunction = (func): Promise<any> =>{
    return new Promise((resolve, reject) => {
        func(function(err, response)  {

    
       if (err) {
   
         reject(err);
    } else {
     
         resolve(response);
       }
    });
});
}
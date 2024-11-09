let db
document.addEventListener('DOMContentLoaded',()=>{
    // llamar a la funcion 
    cmrDB()
    setTimeout(()=>{
        crearCliente()
    },5000)

})

function cmrDB(){
    //crear db con indexDB
    let cmrDB= window.indexedDB.open('crmDB',1)

    //evaluar si hay error 
    cmrDB.onerror=function(){
      console.log('hubo un error')  
    }

    cmrDB.onsuccess=function(){
        console.log('bases de datos creada')
        db=cmrDB.result
    }

    //configuracion de datos onupgradeneeded solo se va a configurar una sola vez 
    cmrDB.onupgradeneeded= function(e){
        console.log('prueba')
        const db = e.target.result
        const ObjectStore= db.createObjectStore('cmrDB',{
            KeyPath:'crmDB',
            autoIncrement: true
        })
        // definir la columnas 
        ObjectStore.createIndex('nombre','nombre',{unique:false})
        ObjectStore.createIndex('email','emai',{unique:true})
        ObjectStore.createIndex('telefono','telefono',{unique:false})

    
        
    }
    
}

function crearCliente(){
    let transaction = db.transaction(['cmrDB'],'readwrite')
    transaction.oncomplete= function(){
        console.log('transaccion completada')
    }

    transaction.onerror =function(){
        console.log('hubo un error')
    }

    //crear objeto
    const objectStore=transaction.objectStore('cmrDB')
    const nuevocliente={
        nombre: 'france',
        telefono:12345678910,
        email:'france@gmail.com'
    }

    let peticion =objectStore.add(nuevocliente)
    console.log(peticion)
}

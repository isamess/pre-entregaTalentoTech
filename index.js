console.log("Hola mundo, aquí Isa desde NodeJS para la pre-entrega del proyecto de Talento Tech");

console.log(process.argv);
const args = process.argv.slice(2);

console.log(args);
async function getProducts(url){
    try{
        const response = await fetch(`https://fakestoreapi.com/${url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

async function deleteProduct(producto){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${producto}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

async function createProduct(producto){
    try{
        const response = await fetch(`https://fakestoreapi.com/products`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("Producto creado con éxito");
            console.log("ID del producto creado:", data.id);
            return data;
        }
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

switch (args[0]) {
    case "GET":
        console.log(args[0]);
        if(args[1] && args[1].startsWith("products")){
            const productos = await getProducts(args[1]);
            console.log(productos)
        } else {
            console.log("Por favor, proporciona un endpoint válido para GET");
        }
        break
        case "POST":
            console.log(args[0]);
            if(args[1] && args[2] && args[3] && args[4] && args[5] == "products"){
                await createProduct({
                    title: args[2],
                    price: parseFloat(args[3]),
                    category: args[4],
                    description: args[5],
                });
                console.log("Producto creado con éxito");
            } else {
                console.log("Por favor, proporciona los parámetros necesarios para crear un producto");
            }
            break;
    case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("products/") && args[1].length > 9){
            const response = await deleteProduct(args[1]);
            console.log("Producto eliminado con éxito:", response);
        } else {
            console.log("Comando no válido para eliminar");
        }
        break;
    default:
        console.log("Comando no reconocido. Por favor, utiliza GET, POST o DELETE.");   
}
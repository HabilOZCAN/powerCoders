/**
 * In this task I implemented a basic market concept.
 * costumer can select the products with a add button (one or with multiple times) and than 
 * he/she can reduce the corresponding items with remove button.
 * With the buy button the customer can see the total list and price 
 * of his/her shopping.
 */
/**
 * implemented by habilozcan@gmail.com
 */
const selectedProducts = [];//the content can be increase and also decrease with custumer interection. 

element = document.getElementById("productlist");//to add the shopping cart and manupulate HTML file `element' "handle" is used.

element.addEventListener("click", function (pEvent) {
    let button = pEvent.target;
    let parentDiv = document.getElementById('selectedproduct');
    let index = button.id;
    
    if (pEvent.target.nodeName.toLowerCase() === "button") {
        if (selectedProducts.length !== 0 && selectedProducts.some(elem => elem.productName === productList[index].productName)) {
            let seachedIndex = selectedProducts.findIndex(item => item.productName === productList[index].productName);
            selectedProducts[seachedIndex].count += 1;
        } else {
            let tempElement = {
                productName: "",
                price: 0,
                productImage: "",
                count: 1
            };
            tempElement.productName = productList[index].productName;
            tempElement.price = productList[index].price;
            tempElement.productImage = productList[index].productImage;
            selectedProducts.push(tempElement);
        }
        parentDiv.innerHTML = "";
        parentDiv.innerHTML = `
                                <i class="fa fa-shopping-cart"></i>
                                <div>
                                    <p>Product Name</p>
                                    <p>Price</p>
                                    <p>Product Image</p>
                                </div>`;

        for (index = 0; index < selectedProducts.length; index++) {
            newName = selectedProducts[`${index}`].productName;
            newPrice = selectedProducts[`${index}`].price;
            newImageSrc = selectedProducts[`${index}`].productImage;
            newCount = selectedProducts[`${index}`].count;
            parentDiv.innerHTML += `<div class = "generated" id = "generatedSelection-${index}">
                                        <p>${newName}</p>
                                        <p>${newPrice} CH</p>
                                        <img src="${newImageSrc}">
                                        <p>X ${newCount}</p>
                                        <button id=${index}>Remove</button> 
                                    </div>`;
        }
        let price = 
        priceCalcuation(selectedProducts);

        parentDiv.innerHTML += `
                                <div>
                                    <p>TOTAL :</p>
                                    <p>${price} CH</p>
                                    <button id="priceButton">Buy</button>
                                </div>
                            `
    }//end of if statement --with corresponding actions block-- which check the clicked element is button or not.
});//end of addEventListener

elementrem = document.getElementById("selectedproduct");// to remove or reduce the product from the shopping cart and manupulate HTML file `elementrem' "handle" is used.

elementrem.addEventListener("click", function (pEvent) {
        let button = pEvent.target;
        let parentDiv = document.getElementById('selectedproduct');
        let index = button.id;
      
        if (pEvent.target.nodeName.toLowerCase() === "button") {
            if (selectedProducts[index].count === 1) {
                selectedProducts.splice(index, 1);
            } else {
                selectedProducts[button.id].count -= 1;
            }
        }

        if (selectedProducts.length !== 0) {
            parentDiv.innerHTML = "";
            parentDiv.innerHTML = `
                                <i class="fa fa-shopping-cart"></i>
                                <div>
                                    <p>Product Name</p>
                                    <p>Price</p>
                                    <p>Product Image</p>
                                </div>`;

            for (index = 0; index < selectedProducts.length; index++) {
                newName = selectedProducts[`${index}`].productName;
                newPrice = selectedProducts[`${index}`].price;
                newImageSrc = selectedProducts[`${index}`].productImage;
                newCount = selectedProducts[`${index}`].count;
                parentDiv.innerHTML += `<div class = "generated" id = "generatedSelection-${index}">
                                        <p>${newName}</p>
                                        <p>${newPrice} CH</p>
                                        <img src="${newImageSrc}">
                                        <p>X ${newCount}</p>
                                        <button id=${index}>Remove</button> 
                                    </div>`;
            }
            let price =
            priceCalcuation(selectedProducts);

            parentDiv.innerHTML += `
                                <div>
                                    <p>TOTAL :</p>
                                    <p>${price} CH</p>
                                    <button id="priceButton">Buy</button>
                                </div>
                            `
        }//end of if block  which checks the selectedProduct is empty or not and corresponding actions..
        else{//if the selectedProduct list is empty than the shopping cart section will be seen with empty area but the titles.
            parentDiv.innerHTML = "";
            parentDiv.innerHTML = `
                                <i class="fa fa-shopping-cart"></i>
                                <div>
                                    <p>Product Name</p>
                                    <p>Price</p>
                                    <p>Product Image</p>
                                </div>`;
        }

    } //end of if statement --with corresponding actions block-- which check the clicked element is button or not.
); //end of action addEventListener.

function priceCalcuation(pProductsList){
    let total = 0;
    pProductsList.forEach(element => {
        total +=element.count*element.price; 
    });
    return (Math.round(total * 1000)/1000).toFixed(2);
}
elementbutton = document.getElementById("selectedproduct");
elementbutton.addEventListener("click", function (pEvent) {
    let button = pEvent.target;
    if(button.id === "priceButton"){
        let products ="";
        selectedProducts.forEach(item=>{
            products += item.productName+"  X  "+item.count+"\n";
        });
        products += "TOTAL  :  "+priceCalcuation(selectedProducts)+" CH";
        alert(products);
        location.reload();
    }
});
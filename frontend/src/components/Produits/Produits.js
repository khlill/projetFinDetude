import React, {useEffect,useState} from 'react';
import  Axios from 'axios';
import './Produits.css';


function Produits() {

    const [produits, setProduits] = useState([{
        nameProd:'',
        description:'',
        price:'',
        category:'',
        quantity:'',
        photo:'',
    }])
    useEffect(()=>{
        fetch("http://localhost:5000/api/product/search").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>setProduits(jsonRes));
      })

      const [categories, setCategories] = useState([{
        name:'',
      }])
      useEffect(()=>{
        fetch("http://localhost:5000/api/category/all").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>setCategories(jsonRes));
      })

      function addtocart(id) {
            const cart ={
                productId: id,
                quantity:1
            }
            console.log(cart)
            Axios.post('http://localhost:5000/cart/addtocart',cart);
          }
      
      
    return (
      <div className="App">
          <section class="section-pagetop bg">
          <div class="container">
              <h2 class="title-page">Nos Produits</h2>
              <nav>
              <ol class="breadcrumb text-white">
                  <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Tous nos produits</li>
              </ol>  
              </nav>
          </div> 
          </section>
        
          <section class="section-content padding-y">
          <div class="container">
          <div class="row">
              <aside class="col-md-3">
                  
          <div class="card">
              <article class="filter-group">
                  <header class="card-header">
                      <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" class="">
                          <i class="icon-control fa fa-chevron-down"></i>
                          <h6 class="title">Type de produits</h6>
                      </a>
                  </header>
                  <div class="filter-content collapse show" id="collapse_1">
                      <div class="card-body">
                          <form class="pb-3">
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search" />
                            <div class="input-group-append">
                              <button class="btn btn-khlil search" type="button"><i class="fa fa-search"></i></button>
                            </div>
                          </div>
                          </form>
                          
                          <ul class="list-menu">
                          {categories.map(category=>
                          <li><a id="list" href="/produits">{category.name}</a></li>
                          )}
                          </ul>
                      </div> 
                  </div>
              </article>
              
              <article class="filter-group">
                  <header class="card-header">
                      <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" class="">
                          <i class="icon-control fa fa-chevron-down"></i>
                          <h6 class="title">Échelle des prix </h6>
                      </a>
                  </header>
                  <div class="filter-content collapse show" id="collapse_3">
                      <div class="card-body">
                          <input type="range" class="custom-range" min="0" max="100" name="" />
                          <div class="form-row">
                          <div class="form-group col-md-6">
                            <label>Min</label>
                            <input class="form-control" placeholder="0 DT" type="number" />
                          </div>
                          <div class="form-group text-right col-md-6">
                            <label>Max</label>
                            <input class="form-control" placeholder="50 DT" type="number" />
                          </div>
                          </div> 
                          <button class="btn btn-block btn-khlil">Apply</button>
                      </div>
                  </div>
              </article> 
              <article class="filter-group">
                  <header class="card-header">
                      <a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" class="">   
                      </a>
                  </header>
                
              </article> 
             
          </div> 
              </aside> 
              <main class="col-md-9">
          <header class="border-bottom mb-4 pb-3">
                  <div class="form-inline">   
                      <div class="btn-group">
                          <a href="#" id="btnList" class="btn btn-outline-brown" data-toggle="tooltip" title="List view"> 
                              <i class="fa fa-bars"></i></a>
                          <a href="#" id="btnList" class="btn  btn-outline-brown" data-toggle="tooltip" title="Grid view"> 
                              <i class="fa fa-th"></i></a>
                      </div>
                  </div>
          </header>
          <div class="row">
          {produits.map(produit=>
              <div class="col-md-4">
                  <figure class="card card-product-grid">
                      <div class="img-wrap"> 
                          <img src={`http://localhost:5000/api/product/photo/${produit._id}`} />
                      </div>
                      <figcaption class="info-wrap">
                          <div class="fix-height">
                              <a href={`/unProduit/${produit._id}`} class="title">{produit.nameProd}</a>
                              <div class="price-wrap mt-2">
                                  <span class="price">{produit.price}DT</span>
                              </div> 
                          </div>
                          <a href="#" onClick={() => addtocart(produit._id)} class="btn btn-block btn-khlil">Ajouter au panier </a>  
                      </figcaption>
                  </figure>
              </div> 
          )}
          </div> 
          <nav class="mt-4" aria-label="Page navigation sample">
            <ul class="pagination">
              <li class="page-item disabled"><a class="page-link" href="#">Précedent</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Suivant</a></li>
            </ul>
          </nav>
              </main>
          </div>
          </div> 
          </section>  
      </div>
    );
  }
  export default Produits;
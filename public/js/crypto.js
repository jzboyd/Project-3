xclass App extends React.Component {
  state = {
    name: '',
    image: '',
    description: '',
    cryptos: []
  }

  handleChange = (event) => {
    this.setState ({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios
    .post('/crypto', this.state)
    .then((response) => {
      this.setState({
        cryptos: response.data,
        name: '',
        image: '',
        description: '',
      })
    })
  }

  deleteCrypto = (event) => {
    axios
    .delete('/crypto/' + event.target.value)
    .then((response) => {
      this.setState({
        cryptos: response.data,
      })
    })
  }

  updateCrypto = () => {
    event.preventDefault()
    const id = event.target.id
    axios
    .put('/crypto/' + id, this.state)
    .then((response) => {
      this.setState({
        cryptos: response.data,
        name: '',
        image: '',
        description: '',
      })
    })
  }


  componentDidMount = () => {
    axios.get('/crypto').then((response) => {
      this.setState({
        cryptos: response.data
      })
    })
  }

  render = () => {
    return (

      <div id="crypto">
      <header class="site-header sticky-top py-1">
        <nav class="container d-flex flex-column flex-md-row justify-content-between">
          <a className="py-2" href="#" aria-label="Logo">
            <img src="/images/cryptocurrency-logo.png" alt="" width="80" height="80" class="d-inline-block align-center"></img>
          </a>
          <img src="/images/crypto-coin.png" alt="" width="380" height="90" class="d-inline-block align-center"></img>

          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Add A Crypto
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <form onSubmit={this.handleSubmit}>
              <li>
              <label htmlFor="name"><p className="input">Name</p></label>
              <input type="text" id="name" onChange={this.handleChange} /></li>

              <label htmlFor="image"><p className="input">Image</p></label>
              <input type="text" id="image" onChange={this.handleChange} />

              <label htmlFor="description"><p className="input">Description</p></label>
              <input type="text" id="description" onChange={this.handleChange} />

              <input id="updatebtn" type="submit" value="Add a Crypto" />
              </form>

              </ul>
            </li>
        </nav>
      </header>

      <div class="position-relative me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">

      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

  <div class="carousel-inner">
    <div class="carousel-item active">
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">One word: Doge</p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1340590280848908288?ref_src=twsrc%5Etfw">December 20, 2020</a></blockquote>

    </div>

    <div class="carousel-item">
      <blockquote class="twitter-tweet"><p lang="en" dir="ltr">A Dogecoin is man’s best friend</p>&mdash; Cameron Winklevoss (@cameron) <a href="https://twitter.com/cameron/status/1284495510972268550?ref_src=twsrc%5Etfw">July 18, 2020</a></blockquote>
    </div>
    <div class="carousel-item">
      <blockquote class="twitter-tweet"><p lang="en" dir="ltr">It’s inevitable <a href="https://t.co/eBKnQm6QyF">pic.twitter.com/eBKnQm6QyF</a></p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1284291528328790016?ref_src=twsrc%5Etfw">July 18, 2020</a></blockquote>
    </div>
    <div class="carousel-item">
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Watching the cryptos trade, it’s EXACTLY like the internet stock bubble. EXACTLY. I think btc, eth , a few others will be analogous to those that were built during the dot-com era, survived the bubble bursting and thrived, like AMZN, EBay, and Priceline. Many won’t</p>&mdash; Mark Cuban (@mcuban) <a href="https://twitter.com/mcuban/status/1348663730712834056?ref_src=twsrc%5Etfw">January 11, 2021</a></blockquote>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>

      </div>



      <div id="cryptolist">

      {this.state.cryptos.map((crypto) => {
        return(


          < div class = "d-md-flex flex-md-equal w-100 my-md-3 ps-md-3" >
              <div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-black overflow-hidden">
                <div class="my-3 py-3">
                  <h2 class="display-5">

                  <p id="cryptoname">{crypto.name}</p></h2>

                </div>
          <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">

            <div class="bg-white shadow-sm mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}>

<br />

            <img src={crypto.image} alt={crypto.name} />
<br />
          <p id="cryptodescription">{crypto.description}</p>
          </div>
          </div>
          </div>


          <li class="nav-item dropdown align-center">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Edit

              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">



          <form id={crypto._id} onSubmit={this.updateCrypto}>
          <label htmlFor="name">Name</label>


          <input type="text" id="name" onChange={this.handleChange} />

          <label htmlFor="image">Image</label>

          <input type="text" id="image" onChange={this.handleChange} />

          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={this.handleChange} />

          <input id="updatebtn" type="submit" value="Update Crypto" />
          </form>

          <button value={crypto._id} onClick={this.deleteCrypto}>DELETE</button>

          </ul>
          </li>

          </div>
          </div>




        )

      })}

      </div>
      <footer class="container py-5">
  <div class="row">
    <div class="col-12 col-md">
      <img src="/images/cryptocurrency-logo.png" alt="" width="80" height="80" class="d-inline-block align-center"></img>

    </div>
    <div class="col-6 col-md">
      <h5>Features</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary" href="#">Bitcoin</a></li>
        <li><a class="link-secondary" href="#">Ethereum</a></li>
        <li><a class="link-secondary" href="#">Dogecoin</a></li>
        <li><a class="link-secondary" href="#">Stuff for developers</a></li>
      </ul>
    </div>

    <div class="col-6 col-md">
      <h5>About</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary" href="#">Team</a></li>
        <li><a class="link-secondary" href="#">Locations</a></li>
        <li><a class="link-secondary" href="#">Privacy</a></li>
        <li><a class="link-secondary" href="#">Terms</a></li>
      </ul>
    </div>
  </div>
</footer>
      </div>


    )

  }

}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

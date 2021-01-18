class App extends React.Component {
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

        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">Crypto Currency</h1>
          <p class="lead fw-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
          <a class="btn btn-outline-secondary" href="#">Coming soon</a>
        </div>

      </div>



      <div id="cryptolist">
      <ul>
      {this.state.cryptos.map((crypto) => {
        return(

          <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">

            <div class="bg-white shadow-sm mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}>
            <p id="cryptoname">{crypto.name}</p>

            <img src={crypto.image} alt={crypto.name} />


          <p id="cryptodescription">{crypto.description}</p>
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
      </ul>
      </div>
      </div>


    )

  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

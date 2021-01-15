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
    .post('/cryptos', this.state)
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
    .delete('/cryptos/' + event.target.value)
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
    .put('/cryptos/' + id, this.state)
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
    axios.get('/cryptos').then((response) => {
      this.setState({
        cryptos: response.data
      })
    })
  }

  render = () => {
    return (
      <div id="crypto">
      <hr />
      <h2 id="subtitle">Add a Crypto</h2>
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="name"><p className="input">Name</p></label>
      <input type="text" id="name" onChange={this.handleChange} />
      <br />
      <label htmlFor="image"><p className="input">Image</p></label>
      <input type="text" id="image" onChange={this.handleChange} />
      <br />
      <label htmlFor="description"><p className="input">Description</p></label>
      <input type="text" id="description" onChange={this.handleChange} />
      <br />
      <input id="updatebtn" type="submit" value="Add a Crypto" />
      </form>

      <div id="cryptolist">
      <ul>
      {this.state.cryptos.map((crypto) => {
        return(
          <li>
          <p id="cryptoname">{crypto.name}</p>
          <br />

          <p id="cryptodescription">{crypto.description}</p>

          <img src={crypto.image} alt={crypto.name} />
          <br />

          <button value={crypto._id} onClick={this.deleteCrypto}>DELETE</button>
          <br />

          <details>
          <summary>Edit this Crypto</summary>
          <form id={crypto._id} onSubmit={this.updateCrypto}>
        )
      })}
    )
  }
}

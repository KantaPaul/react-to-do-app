console.log('app js is running');

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="display-4">{this.props.title}</h1>
        {this.props.subTitle && <p className="lead">{this.props.subTitle}</p>}
      </div>
    );
  }
};

class Options extends React.Component {
  render () {
    return (
      <div className="option-list mb-3">
        <p className="lead text-primary mt-5"><strong>{this.props.isHere}</strong></p>
        {this.props.option.map(option => <Option key={option} optiontext={option} removeSingleOption={this.props.removeSingleOption}/>)}
        <button disabled={this.props.optionIsHere} onClick={this.props.removeAllOptions} className="btn btn-danger mt-3">Remove All Option</button>
      </div>
    );
  }
};

class Option extends React.Component {
  render () {
    return (
      <div className="border-bottom justify-content-center py-3">
        <span className="mr-2">{this.props.optiontext}</span>
        <button onClick={() => {
          this.props.removeSingleOption(this.props.optiontext)
        }} className="btn btn-danger">Remove</button>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.addOptions = this.addOptions.bind(this);
    this.state = {
      error: undefined
    }
  }
  addOptions(e) {
    e.preventDefault();
    let value = e.target.elements.option.value.trim();
    let error = this.props.addOption(value);
    this.setState((e) => ({
      error: error
    }))
    if (!error) {
      e.target.elements.option.value = ''
    }
  }
  render () {
    return (
      <div className="from-group">
        <form onSubmit={this.addOptions}>
          {this.state.error && <p>{this.state.error}</p>}
          <div className="input-group">
            <input className="form-control" type="text" name="option" />
            <button className="btn btn-primary">Add Option</button>
          </div>
        </form>
      </div>
    );
  }
};

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.removeAllOptions = this.removeAllOptions.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeSingleOption = this.removeSingleOption.bind(this);
    this.state = {
        options: []
    }
  }
  removeAllOptions() {
    this.setState(() => ({
      options: []
    }))
  }
  addOption(option) {
    if (!option) {
      return "Add Valid value"   
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This value already exists'
    }
    this.setState((e) => ({
      options: e.options.concat([option])
    }));
  }
  removeSingleOption(optionToRemove) {
    this.setState((e) => {
      return {
        options: e.options.filter(option => {
          return optionToRemove !== option;
        })
      };
    })
  }
  componentDidMount() {
    try {
      let json = localStorage.getItem('options');
      let options = JSON.parse(json);
      if (options) {
        this.setState(() => {
          return {
            options: options
          }
        })
      }
    } catch (e) {

    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      let json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  render() {
    let title = "To Do App",
        subTitle = "First React App";
    return (
      <div className="app-group">
        <Header title={title} subTitle={subTitle}/>
        <Options removeAllOptions={this.removeAllOptions} optionIsHere={this.state.options.length === 0} isHere={this.state.options.length === 0 ? 'No option is here': 'Option is here' } removeSingleOption={this.removeSingleOption} option={this.state.options} />
        <Form addOption={this.addOption} />
      </div>
    );
  }
};

let app = document.getElementById('app');

ReactDOM.render(<MyApp />, app);
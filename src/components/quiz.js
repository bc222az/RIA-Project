var React = require('react'),
    ptypes = React.PropTypes,
    ReactRedux = require('react-redux'),
    actions = require('../actions');

var quiz = React.createClass({
    propTypes: {
        quiz: ptypes.func.isRequired,
		change: ptypes.func.isRequired
    },
    getInitialState: function() {
      return { answer: "A3" }
    },
    onOptionChanged: function(e) {
        this.setState({ answer: e.currentTarget.value });
    },
    onMuteSound: function(){
      //document.getElementById("soundtrack").volume=0.1;
        document.getElementById("soundtrack").muted = true;
    },
    render: function(){

        return (

            <div id="content">
              <audio id="soundtrack"><source src="Sound/theme.mp3" type="audio/mpeg"/></audio>
              <button id="muteSoundButton" onClick={this.onMuteSound}>{this.props.mute}</button>
                <h2>Quiz</h2>
                <div id="instructions">
                    <p>
                      If you pick the correct answer you will get 10 points and if you pick the wrong answer you will lose 10 points.
                      For each correct answer your multiplier will increase which means more points from each question.
                      The multiplier will be reset if you pick an incorrect answer.
                    </p>
              </div>

              <div id="message">
                    <p>{this.props.questionValue}</p>
              </div>

                  <div id="multiplierandpoints">
                      <p id="points">Points: {this.props.points}</p>
                      <p id="multiplier">Multiplier x{this.props.multiplier}</p>
                  </div>



                  <div id="options">
                              <p>{this.props.question}</p>
                        <p>
                    					<input type="radio" checked={this.state.answer === "A1"} onChange={this.onOptionChanged} name="q1" id="A1" value="A1"/>{this.props.option1}
                    					<input type="radio" checked={this.state.answer === "A2"} onChange={this.onOptionChanged} name="q1" id="A2" value="A2"/>{this.props.option2}
                    					<input type="radio" checked={this.state.answer === "A3"} onChange={this.onOptionChanged} name="q1" id="A3" value="A3"/>{this.props.option3}

                              <button onClick={this.props.quiz.bind(null, this.state.answer)}>Next question</button>
                        </p>
                  </div>
            </div>
        );

    }
});

var mapStateToProps = function(state){
    return state.quiz;
};

var mapDispatchToProps = function(dispatch){
    return {
        quiz: function(answer){
            dispatch(actions.quiz(answer));
        },
		change: function(){
            dispatch(actions.change());
        }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(quiz);
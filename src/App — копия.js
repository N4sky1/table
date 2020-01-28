import React from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import Table from './Table'
import Popup from './Popup'
import Data from './Data'



class App extends React.Component {
    
    state={
        popup: false,
        spanNumber: ''
    }

	propTypes = {
		table: PropTypes.object
    }

    spanSize = React.createRef();
    spanColor = React.createRef();
    
    getData = (obj, target) => {
        let result = []
        recursion(obj)
        function recursion(items) {
            items.map(item => {
                if ( target === 'color') {
                   result.push(item.Color) 
                }
                if ( target === 'value') {
                    result.push(item.Value) 
                 }
                if (item.Children && item.Children.length) { 
                    recursion(item.Children)
                }
            })
        }
        return result
    }

    clickSpan = (data) => {
        console.log(data.Value)
        this.setState((state) => {
            return {
                popup: true,
                spanNumber: data.Value,
            }
        })
        this.forceUpdate()
    }
    closePopup = () => {
        this.setState(state => {
            return {
                popup: false
            }
        })
    }
    addSpan = () => {
        let values = this.getData(Data.Children, 'value')
        let color = this.spanColor
        let size = this.spanSize
        let value = Math.max.apply(null, values) + 1;
        let spanNumber = this.state.spanNumber
        let newSpan = { 
            "VerticalSpan": size.current.value, 
            "Color": color.current.value, 
            "Value": value, 
            "Children": [] 
        }
        

        function getObj() {
            recursion(Data.Children)
            function recursion(items) {
                items.forEach(item => {
                    if (item.Value == spanNumber) {
                       // item.Children = [...item.Children, newSpan] 
                       item.Children = update(item.Children, {$push: [newSpan]})
                    }
                    if (item.Children && item.Children.length) { 
                        recursion(item.Children)
                    }
                })
            }
        }
        getObj()
        this.forceUpdate()
    }
	render() {
        const { popup, spanNumber } = this.state
		return (
            <div className="app">
              <Table data={Data.Children} clickSpan={this.clickSpan}/>  
              <Popup 
                show={popup} 
                spanNumber={spanNumber} 
                closePopup={this.closePopup}
                spanColor={this.spanColor}
                spanSize={this.spanSize}
                addSpan={this.addSpan}
                colors={Array.from(new Set(this.getData(Data.Children, 'color')))}
                />
            </div>
        );
	}
};

export default App;
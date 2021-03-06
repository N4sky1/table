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
    closePopup = () => {
        this.setState(() => {
            return {
                popup: false,
            }
        })
    }
    clickSpan = (data) => {
        this.setState((state) => {
            return {
                popup: true,
                spanNumber: data.Value,
            }
        })
        this.forceUpdate()
    }

    addSpan = (bool) => {
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
        
        let changeItem;
        let changeItemChildren;
        const getObj = () => {
            
            
            const recursion = (items) => {
                items.map((item, idx) => {
                    if (item.Value == spanNumber) {
                       if(bool) {
                           item.Children = update(item.Children, {$push: [newSpan]})
                       } else {
                           if(spanNumber <= Data.Children.length ) {
                                Data.Children = update(Data.Children, {$set: [
                                ...Data.Children.slice(0, idx),
                                ...Data.Children.slice(idx + 1)
                            ]}) 
                            this.closePopup()
                           } else {
                               changeItem = item.parrent
                                changeItemChildren = update(items, {$set: [
                                    ...items.slice(0, idx),
                                    ...items.slice(idx + 1)
                                ]})  
                           }
                            
                       }
                    }
                    if (item.Children && item.Children.length) { 
                        recursion(item.Children)
                    }
                })
            }
            recursion(Data.Children)
        }
        getObj()

       if(changeItem) {
        changeItem.Children = update(changeItem.Children, {$set: changeItemChildren})
        this.closePopup()
       }
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
                deleteSpan={this.deleteSpan}
                colors={Array.from(new Set(this.getData(Data.Children, 'color')))}
                />
            </div>
        );
	}
};

export default App;
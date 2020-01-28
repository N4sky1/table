import React from 'react';

class Table extends React.Component {
    change = (item) => {
        this.props.clickSpan(item)
    }
    render() {
        const {data} = this.props
        return (
        <>  
            <div className='table'>
                {data.map((item) => (
                    <div 
                        className={`column${item.Value <= data.length ? '-main' : ''}`} 
                        key={item.Value}>

                        <div 
                            className='span' 
                            style={{background: `${item.Color}`, height: `${50 * item.VerticalSpan}px`}}
                            onClick={()=>this.change(item)}>

                            <span className='span__number'>{item.Value}</span>
                            <span className='span__vertical-size'>v={item.VerticalSpan}</span>
                        </div>
                        
                        {item.Children && item.Children.length ? 
                            <Table data={item.Children} 
                                clickSpan={this.props.clickSpan}
                            /> : null}
                    </div>
                ))}
            </div>
        </>  
        )
    }
    
}
export default Table
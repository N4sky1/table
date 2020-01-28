const Data = {
    "Name": "Table",
    "Children": [
        {
            "VerticalSpan": 1, "Color": "Orange", "Value": "1",
            "Children": [
                {
                    "VerticalSpan": 1, "Color": "Green", "Value": "4",
                    "Children": [ { "VerticalSpan": 1, "Color": "Purple", "Value": "7", "Children": [] } ]
                },
                {
                    "VerticalSpan": 1, "Color": "Green", "Value": "5",
                    "Children": [ { "VerticalSpan": 1, "Color": "Purple", "Value": "8", "Children": [] } ]
                }
            ]
        },
        {
            "VerticalSpan": 1, "Color": "Orange", "Value": "2",
            "Children": [ { "VerticalSpan": 2, "Color": "Green", "Value": "6", "Children": [] } ]
        },
        {
            "VerticalSpan": 2, "Color": "Orange", "Value": "3",
            "Children": [
                { "VerticalSpan": 1, "Color": "Purple", "Value": "9", "Children": [] },
                { "VerticalSpan": 1, "Color": "Purple", "Value": "10", "Children": [] }
            ]
        }
    ]
};
const getParrent = (target) => {
    target.forEach(item => {
        item.Children.forEach(subItem => {
            subItem.parrent = item
        })
        if (item.Children && item.Children.length) { 
            getParrent(item.Children)
        }
    })
}
getParrent(Data.Children)

export default Data
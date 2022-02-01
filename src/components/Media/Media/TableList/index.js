import {Grid, makeStyles} from "@material-ui/core";
import GifIcon from "@material-ui/core/SvgIcon/SvgIcon";
import moment from "moment";
import React, {useState, useEffect} from "react";
import ListHeader from './header';
import PlaceholderItem from './item';


const useStyles = makeStyles({
    tableHeading: {
        fontWeight: 700,
        fontSize: 15,
    },
    tableFields: {
        fontWeight: 500,
        fontSize: 15,
    },
    sideFilter: {
        padding: 5,
        fontWeight: 600,
        fontSize: 15,
        paddingBottom: 0,
        marginBottom: 0,
        cursor: "pointer",
    },
    sideSubFilter: {
        padding: 5,
        fontWeight: 500,
        fontSize: 13,
        paddingBottom: 0,
        marginBottom: 0,
        marginLeft: 10,
        cursor: "pointer",
    },
    tags: {
        border: "1px solid #d8d8d8",
        height: 40,
        width: "max-content",
        fontWeight: 600,
        borderRadius: 4,
        marginLeft: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    icons: {
        color: "#d8d8d8",
    },
    dropdownHidden: {
        display: "none",
        position: "absolute",
        backgroundColor: "white",
        minWidth: 230,
        boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
        border: "1px solid #d5d5d5",
        borderRadius: 4,
        // padding: 5,
        marginLeft: -240,
        zIndex: 415,
        // maxHeight: "60vh",
        // overflowY: "scroll",
        overflowX: "hidden",
    },
    mediaStatsRightHeading: {
        fontWeight: "bold",
        fontSize: 16,
        margin: 0,
        width: "100%",
        textAlign: "center",
    },
    mediaStatsRightState: {
        fontSize: 18,
        margin: 0,
        height: 30,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },
    mediaStatsGrid: {
        borderBottom: "1px solid #d2d2d2",
        paddingTop: 16, paddingBottom: 16
    }
});


const PlaceholderTableList = (props) => {
    const classes = useStyles();
    let [itemsList, setItemList] = useState(props.list);
    const [count, setCount] = useState(0);
    const [sortingOrder, setSortingOrder] = useState({name: null, date: null,owner:null,associatedTo:null});
    const [selectAll, setSelectAll] = useState(false);


    console.log('filter = ', props.filter, '   itemslist = ', itemsList);


    const handleSortingOrder = (type) => {
        let defaultSortingOrder={name: null, date: null,owner:null,associatedTo:null};
        if (sortingOrder[type] === null || sortingOrder[type] === 'descending') {
            setSortingOrder({...defaultSortingOrder, [type]: "ascending"})
        } else if (sortingOrder[type] === null || sortingOrder[type] === 'ascending') {
            setSortingOrder({...defaultSortingOrder, [type]: "descending"})
        }
    }


    const handleSetSelectAll=()=>{

        if(!selectAll){
            itemsList=itemsList.map((item)=>{return {...item,isSelected:true}})

        }else{
            itemsList=itemsList.map((item)=>{return {...item,isSelected:false}})
        }

        setSelectAll(!selectAll);
        setItemList(itemsList);
    }


    const handleHover = (index, hover) => {
        itemsList[index].hover = hover;
        setItemList(itemsList);
        setCount(count + 1);

        console.log('item = ', index, '  ', itemsList[index]);
    }


    const handleItemSelected = (index) => {
        if (itemsList[index].isSelected) {
            itemsList[index].isSelected = false;
        } else {
            itemsList[index].isSelected = true;

        }
        setItemList(itemsList);
        setCount(count + 1);


    }


    if (sortingOrder.name && sortingOrder.name === "ascending") {
        itemsList.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortingOrder.name && sortingOrder.name === "descending") {
        itemsList.sort((a, b) => b.name.localeCompare(a.name))
    }

    if (sortingOrder.date && sortingOrder.date === "ascending") {
        itemsList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortingOrder.date && sortingOrder.date === "descending") {
        itemsList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }


    if (sortingOrder.owner && sortingOrder.owner === "ascending") {

        const itemsWithoutOwner=itemsList.filter((item)=>!item.owner || !item.owner.first_name);
        const itemsWithOwner=itemsList.filter((item)=>item.owner && item.owner.first_name);


        itemsWithOwner.sort((a, b) => (a.owner.first_name+' '+a.owner.last_name).
        localeCompare(b.owner.first_name+' '+b.owner.last_name));

        itemsList=itemsWithOwner.concat(itemsWithoutOwner);

    } else if (sortingOrder.owner && sortingOrder.owner === "descending") {
        const itemsWithoutOwner=itemsList.filter((item)=>!item.owner || !item.owner.first_name);
        const itemsWithOwner=itemsList.filter((item)=>item.owner && item.owner.first_name);


        itemsWithOwner.sort((a, b) => (b.owner.first_name+' '+b.owner.last_name).
        localeCompare(a.owner.first_name+' '+a.owner.last_name));

        itemsList=itemsWithOwner.concat(itemsWithoutOwner);

    }




    if (sortingOrder.associatedTo && sortingOrder.associatedTo === "ascending") {

        const itemsWithoutOwner=itemsList.filter((item)=>!item.contact || !item.contact.first_name
            || !!item.contact.last_name);
        const itemsWithOwner=itemsList.filter((item)=>item.contact && item.contact.first_name
        && item.contact.last_name);


        itemsWithOwner.sort((a, b) => (a.contact.first_name+' '+a.contact.last_name).
        localeCompare(b.contact.first_name+' '+b.contact.last_name));

        itemsList=itemsWithOwner.concat(itemsWithoutOwner);

    } else if (sortingOrder.associatedTo && sortingOrder.associatedTo === "descending") {
        const itemsWithoutOwner=itemsList.filter((item)=>!item.contact || !item.contact.first_name
            || !!item.contact.last_name);
        const itemsWithOwner=itemsList.filter((item)=>item.contact && item.contact.first_name
            && item.contact.last_name);

        itemsWithOwner.sort((a, b) => (b.contact.first_name+' '+b.contact.last_name).
        localeCompare(a.contact.first_name+' '+a.contact.last_name));

        itemsList=itemsWithOwner.concat(itemsWithoutOwner);

    }


    let tempItemsList = [];

    console.log('filter list = ', sortingOrder, '   ', tempItemsList, '  ', itemsList)


    if (props.isMedia && props.filter && props.filter.length > 0) {
        const filter = props.filter;


        for (let f of filter) {
            if (f.type === 'owner') {

                for (let item of itemsList) {
                    if (item && item.owner && (item.owner.first_name + ' ' + item.owner.last_name) === f.username) {
                        if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                            tempItemsList.push(item)
                        }
                    }
                }
            } else if (f.type === 'date_created') {

                const rawFilter=f.raw;
                for (let item of itemsList) {
                    if (item && item.created_at) {

                        if((new Date(item.created_at).getTime() <= rawFilter.endDate.getTime()
                            && (new Date(item.created_at).getTime()) >= rawFilter.startDate.getTime())){
                            if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                                tempItemsList.push(item)
                            }
                        }
                    }
                }



                console.log('date_created = ',f);
            }
            else if (f.type === 'file_type') {
                for (let item of itemsList) {
                    if (item && item.file_type && item.file_type.includes((f.username).toLowerCase())) {
                        if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                            tempItemsList.push(item)
                        }
                    }
                }
            } else if (f.type === 'tag') {
                for (let item of itemsList) {
                    if (item && item.tags &&
                        (item.tags).findIndex((t) => (t.name).toLowerCase() === (f.username).toLowerCase())!==-1) {
                        if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                            tempItemsList.push(item)
                        }
                    }
                }
            }else if (f.type === 'recent') {
                for (let item of itemsList) {
                    if (item && item.created_at) {
                        const startDate=new Date(new moment().clone().subtract({ days: 30 }));
                        const endDate=new Date(new moment());
                        console.log('start date = ',startDate.getTime(),' end date = ',endDate.getTime(),' item = ',
                            (new Date(item.created_at).getTime() <= startDate.getTime()));

                        if((new Date(item.created_at).getTime() >= startDate.getTime()
                            && (new Date(item.created_at).getTime()) <= endDate.getTime())){
                            if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                                tempItemsList.push(item)
                            }
                        }
                    }
                }
            }else if (f.type === 'personalized') {
                for (let item of itemsList) {
                    if (item && item.contact ) {
                        if (tempItemsList.findIndex((t) => t.id === item.id) === -1) {
                            tempItemsList.push(item)
                        }
                    }
                }
            }
        }

    } else {
        tempItemsList = JSON.parse(JSON.stringify(itemsList));
    }


    console.log('items list = ', props)
    return (

        <div style={{
            width: "100%",
            marginTop: props.isPlaceholderDetails ? 10 : 0,
            overflowY: 'scroll',
            overflowX: 'hidden'
        }}>
            <ListHeader
                handleSortingOrder={handleSortingOrder}
                isPlaceholder={props.isPlaceholder}
                handleSetSelectAll={handleSetSelectAll}
                selectAll={selectAll}
                isPlaceholderDetails={props.isPlaceholderDetails}/>

            <div
                style={{
                    width: "100%", overflowY: 'scroll', overflowX: 'hidden',
                    height: props.isPlaceholderDetails ? '55vh' :
                        (props.showFullHeight ? '55vh' : '30vh')
                }}
                id="infinit"
                onScroll={() => {
                    props.handleScroll();
                }}
            >


                {tempItemsList &&
                tempItemsList.map((item, index) => {

                    return (

                        <PlaceholderItem
                            item={item}
                            index={index}
                            key={item.key}
                            placeholderId={props.placeholderId}
                            handleItemSelected={handleItemSelected}
                            setShowMediaStats={props.setShowMediaStats}
                            isPlaceholderDetails={props.isPlaceholderDetails}
                            isPlaceholder={props.isPlaceholder}
                            setLightboxVideo={props.setLightboxVideo}
                            setLightboxPicture={props.setLightboxPicture}
                            handleHover={handleHover}
                            setSelectedPlaceHolder={props.setSelectedPlaceHolder}/>
                    )
                })}
            </div>
        </div>
    )
}
export default PlaceholderTableList

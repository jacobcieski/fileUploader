import React, { Component } from 'react';
import axios from '../../../../fileuploader/frontend/fileuploader/node_modules/axios';

const loadingImg = require('./img/loading_apple.gif');

class fileList extends Component{
    constructor(props){
        super(props);
        this.state = {
            buffer: [],
            srcBuffer: [],
            allloaded: false
        }
    
    this.getS3Bucket = this.getS3Bucket.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
    }

    componentDidMount(){
        this.getS3Bucket();
    }

    getS3Bucket = () => {
        axios.post("http://localhost:3001/get_s3").then(response => {
            let returnData = response.data.data.returnData;

            let div = document.getElementById("tableList");

            for(let i = 0; i<returnData.fileList.length; i++){
                console.log("111");
                
                if(document.getElementById(returnData.fileList[i].Key) != null){
                    this.getThumbnail(returnData.fileList[i].Key);
                    continue;
                }
                let outline = document.createElement("div");
                outline.setAttribute("class", "itemList");

                let item = document.createElement("div");
                item.setAttribute("class", "image");

                let img = document.createElement("IMG");
                img.setAttribute("id", returnData.fileList[i].Key);
                img.src = loadingImg
                img.setAttribute("width", 200);
                img.setAttribute("height", 200);
                img.setAttribute("alt", "Loading thumbnail");
                const err = document.createAttribute("onerror");
                err.value="this.src='" + loadingImg + "';";
                img.setAttributeNode(err);
                
                let name = document.createElement("div");
                name.setAttribute("class", "desc");
                name.appendChild(document.createTextNode(returnData.fileList[i].Key));
                
                item.appendChild(img);
                item.appendChild(name);
                outline.appendChild(item);

                div.appendChild(outline);
                this.getThumbnail(returnData.fileList[i].Key);
            } 
        } 
        );
    }

    getThumbnail = (imgKey) => {
        axios.post("http://localhost:3001/get_tn",{
            fileName : imgKey
        }).then(response => {
            let returnData = response;
            const img = document.getElementById(imgKey);
            const newUrl = "https://s3.amazonaws.com/" + returnData.data.bucket + "/resize-" + returnData.data.key;

            console.log(newUrl);
            
            setInterval(function(){
                if(img != null){
                    img.setAttribute("src", newUrl);
                }
            }, 5000);

        }).catch(error => {
            const img = document.getElementById(imgKey);
            img.src = loadingImg;
            this.getThumbnail(imgKey);
            console.log(error);
        });
    }

        
    render(){
        setInterval(this.getS3Bucket(), 1000);
        setInterval(clearInterval(), 20000);

        return(
            <div id="tableList">
            </div>
        );
    }
}

export default fileList;
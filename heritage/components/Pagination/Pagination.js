import React, { useState, useEffect } from 'react';
import { from } from 'rxjs';
import styles from './pagination.module.scss'

export default function Pagination(props) {
    const [finalPages, setFinalPages] = useState(null);
    const [changePage, setChangePage] = useState(false);

    function setActualPageSafe(page){
        let totalPages = props.totalHits%10>0?parseInt((props.totalHits/10))+1:props.totalHits/10;
        let actualPage = 0;
        if(page<=0){
            props.setActualPage(1);
            actualPage = 1;
        }
        else if(page>=totalPages){
            props.setActualPage(totalPages);
            actualPage = totalPages;
        }
        else{
            props.setActualPage(page)
            actualPage = page;
        }
        props.from(10*(actualPage-1))
        setChangePage(!changePage)
        props.changeResultsBcPagination(!changePage)
    }

    function setActualPageEvent(){
        setActualPageSafe(event.target.value)
    }

    function Next(){
        setActualPageSafe(actualPage+1);
    }

    function Previous(){
        setActualPageSafe(actualPage-1);
}

    function createResults () {
        let totalPages = props.totalHits%10>0?parseInt((props.totalHits/10))+1:props.totalHits/10;
        var pages = new Array();
        var i;
        if(totalPages<=3){
        for (i=1;i<=totalPages;i++){
            if(i==props.actualPage){
            pages[i-1]= <button key = {i} className={styles.active}>{i}</button>
            }
            else{
                pages[i-1]= <button key = {i} value = {i} onClick={() => {setActualPageEvent()}}>{i}</button>
            }
        } 
    }
    else{
        if(props.actualPage==1){
            for (i=1;i<=3;i++){
                if(i==props.actualPage){
                pages[i-1]= <button key = {i} className={styles.active}>{i}</button>
                }
                else{
                    pages[i-1]= <button key = {i} value = {i} onClick={() => {setActualPageEvent()}}>{i}</button>
                }
            } 
        }else if(props.actualPage==totalPages){
            pages[0]= <button key = {props.actualPage-2} value = {props.actualPage-2} onClick={() => {setActualPageEvent()}}>{props.actualPage-2}</button>
            pages[1]= <button key = {props.actualPage-1} value = {props.actualPage-1} onClick={() => {setActualPageEvent()}}>{props.actualPage-1}</button>
            pages[2]= <button key = {props.actualPage} className={styles.active}>{props.actualPage}</button>
        }
        else{
            pages[0]= <button key = {props.actualPage-1} value = {props.actualPage-1} onClick={() => {setActualPageEvent()}}>{props.actualPage-1}</button>
            pages[1]= <button key = {props.actualPage} className={styles.active}>{props.actualPage}</button>
            pages[2]= <button key = {parseInt(props.actualPage)+1} value = {parseInt(props.actualPage)+1} onClick={() => {setActualPageEvent()}}>{parseInt(props.actualPage)+1}</button>
        }


    }
        setFinalPages(null);       
        setFinalPages(pages);
    }

    useEffect(() => {
        createResults()
    }, [changePage, props.changeBcResults]);
    return (
        <div className={styles.pagination}>
  <button onClick={() => {Previous()}}>&laquo;</button>
  {finalPages}
  <button onClick={() => {Next()}}>&raquo;</button>
</div>
    )
}
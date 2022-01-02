import React from 'react'
import { useIntl } from "react-intl"
import styles from './multiselectFilter.module.scss'


export default function MultiSelectFilter(props) {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    return (
        <>
            <details className={styles.expandable}>
                <summary className={styles.s}>Promotions</summary>
                <div id={styles.checklist}>
                    <input id="01" type="checkbox" name="r" value="1" />
                    <label for="01">2020-2021</label>
                    <input id="02" type="checkbox" name="r" value="2" />
                    <label for="02">20109-2020</label>
                    <input id="03" type="checkbox" name="r" value="3" />
                    <label for="03">Coffee</label>
                </div>
            </details>
        </>
    )
}

/**
 * color:$green;
    cursor: pointer;
    width: 150%;
    height: 150%;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
 */

/**
 * {props.promotions != null ?
            <form>
              <div class="multiselect">
                <div class="selectBox">
                  <select>
                    <option selected="null">All promotions</option>
                  </select>
                  <div class="overSelect"></div>
                </div>
                <div id="checkboxes">
                {props.promotions[0] != null ? <label for="one"> <input type="checkbox" id="one"/>{props.promotions[0].key}</label> : null}
                {props.promotions[1] != null ? <label for="two"> <input type="checkbox" id="two"/>{props.promotions[1].key}</label> : null}
                {props.promotions[2] != null ? <label for="three"> <input type="checkbox" id="three"/>{props.promotions[2].key}</label> : null}
                </div>
              </div>
            </form>:null}
 */

/**
 * /*
Only custom marker for summary/details
For cross browser compatible styling hide Firefox's marker by setting summary { display: block }
and Chrome and Safari's marker by setting ::-webkit-details-marker {display: none;}
*/

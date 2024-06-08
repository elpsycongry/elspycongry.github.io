import {Done, MoreHoriz, MoreVert} from "@mui/icons-material";
import * as React from "react";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import './submenunoti.scss'
import {useState} from "react";

export function SubmenuNotification({markAllReaded}) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        console.log(open)
        setOpen(!open)
    }
    return (
        <>
            <Tippy
                animation={false}
                onClickOutside={toggle}
                visible={open}
                placement={'bottom-end'}
                interactive
                render={(...attrs) =>
                    <div className={'setting-container'}>
                        <div className={"setting-items"}>
                            <div className={'setting-item'} onClick={() => {markAllReaded(); toggle()}}><Done className={'icon'} />Đánh dấu tất cả là đã đọc</div>
                        </div>
                    </div>
                }
            >
                <div className={"setting-icon"}>
                    <MoreHoriz  onClick={toggle}></MoreHoriz>
                </div>
            </Tippy></>
    )
}
import React from "react";

const Footer = () => {
    let copy = String.fromCodePoint(0x00A9);

    return (
        <footer
            className="w-100 mt-auto p-4 text-center footer flex-row
            justify-content-center"
        >
            <div className="container footer">
                Get copyrighted {copy}
            </div>
        </footer>
    )
}

export default Footer;
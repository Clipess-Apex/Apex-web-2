import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { StyleContext } from "../providers/StyleContextProvider";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const styleContext = useContext(StyleContext);
    const [styles, setStyles] = useState<any>(styleContext.getComponentStyle("homePage"));    
    const isMobile = useMediaQuery({ query: "(max-width: 786px)" });    

    useEffect(() => {        
        setStyles(styleContext.getComponentStyle("homePage"));        
    }, [isMobile]);   
     

    return (
        <div>
            <h1 style={styles.title}>Home Page 2</h1>
        </div>      
    )
}
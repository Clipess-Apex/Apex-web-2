import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { merge } from 'react-merge';
import { styleDictionary } from '../styles/StyleDictionary';

interface Props {
    children: React.ReactNode;
}

export interface StyleContextType {        
    getComponentStyle(component: string): any;
}

export const StyleContext = React.createContext<StyleContextType>({        
    getComponentStyle: () => {}
});

export const StyleContextProvider: React.FC<Props> = (props) => {
         
    let isMobile = useMediaQuery({ query: "(max-width: 786px)" });          

    const handleComponentStyle = (component: string) => {   
        let styles = styleDictionary.get(component);
        if(isMobile) {   
            return styles.mobile;            
        } else {
            // merge mobile styles with changes required for desktop
            let extendStyles = merge(styles.mobile, styles.desktop); 
            return extendStyles;
        }                                    
    }

    return (
        <StyleContext.Provider value={{                        
            getComponentStyle: handleComponentStyle
        }}>           
            {props.children}
        </StyleContext.Provider>
    );
}

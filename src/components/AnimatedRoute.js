import React from "react";

import {
    Route,
    useLocation
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

function AnimatedRoute(props) {
    return (
        <motion.div
            key={props.key}
            // vertical slide fade in:
            initial={{ y: '3%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}

            // fade in
            // initial={{ opacity: 0.5 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0.5 }}
            transition={{ duration: 1.5 }}
        >

            <Route
                key={props.key + "1"}
                exact path={props.path}
                component={props.component}
            />

        </motion.div>
    )
}

export default AnimatedRoute;

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
            initial={{ y: '-30%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.75 }}
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

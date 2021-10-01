import { useEffect } from "react";
import { useHistory } from "react-router";

const useScrollOnRouteChange = () => {
    const history = useHistory();
    useEffect(() => {
        const unlisten = history.listen(() => {
            setTimeout(() => {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }, 50);
        });

        return () => unlisten();
    }, [history]);
};

export default useScrollOnRouteChange;

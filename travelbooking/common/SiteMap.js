import { NavigationActions, StackActions } from 'react-navigation'

class SiteMap {
    static showScreen(navigation, screenName, params = {}) {
        navigation.navigate(screenName, params);
    }

    static openScreen(navigation, screenName, params = {}) {
        navigation.push(screenName, params);
    }

    static replaceScreen(navigation, screenName, params = {}) {
        navigation.replace(screenName, params);
    }

    static goBack(navigation, key) {
        navigation.dispatch(NavigationActions.back({ key: key }));
    }

    static pop(navigation) {
        navigation.goBack(null)
    }

    static popToTop(navigation) {
        navigation.popToTop()
    }

    static resetToRoot(navigation) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'App' })
            ]
        })
        navigation.dispatch(resetAction)
    }
}

export default SiteMap;

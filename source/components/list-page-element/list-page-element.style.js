import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    card: {
        width: width ,
        marginTop: 13,
        borderRadius: 5,
    },
    image: {
        height: 170
    },
    cardView: {
        padding: 5
    },
    body: {
        padding: 8,
        backgroundColor: 'rgb(245, 245, 245)',
    },
    horizontalView: {
        flexDirection: 'row',
        marginTop: 10
    },
    hor: {
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Asap-Regular',
        fontSize: 24,
        marginTop: 10
    },
    caption: {
        fontFamily: 'Asap-Regular',
        fontSize: 16,
        marginTop: 10
    },
    place: {
        fontFamily: 'Asap-Regular',
        fontSize: 17
    },
    starView: {
        alignItems: 'flex-start',
        marginBottom: 5
    },
    image: {
        height: 120
    },
    icon: {
        marginLeft: 10
    },
    introductions: {
        fontFamily: 'Asap-Regular',
        fontSize: 14
    },
})

export default styles
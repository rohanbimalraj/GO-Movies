import { View, Text, StyleSheet } from "react-native"
import AppFonts from "../../constants/app-fonts"
import Colors from "../../constants/colors"

function ReviewCard({ author, date, review }) {
    return <View style={styles.rootContainer}>
        <View style={styles.authorConatiner}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.description}>"{review}"</Text>
        <View style={styles.separator}></View>
    </View>
}

export default ReviewCard

const styles = StyleSheet.create({
    rootContainer: {
        padding: 20
    },
    authorConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    author: {
        fontFamily: AppFonts.SG_Bold,
        fontSize: 16,
        color: Colors.accent500
    },
    date: {
        fontFamily: AppFonts.SG_SemiBold,
        fontSize: 14,
        color: Colors.accent500
    },
    description: {
        fontFamily: AppFonts.SG_Regular,
        fontSize: 12,
        color: Colors.accent500
    },
    separator: {
        flex: 1,
        height: 2,
        backgroundColor: Colors.accent500,
        marginTop: 8
    }
})
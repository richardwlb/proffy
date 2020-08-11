import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40,
    },
    content: {
        flex: 1, // VAI OCUPAR A AREA TOTAL.
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180,
    },
    description: {
        marginTop: 24,
        color: '#d4c2ff',
        fontSize: 16,
        lineHeight: 16,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240,
    },
    buttonTudoBem: {
        backgroundColor: '#04d361',
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 23,

    },
});

export default styles;
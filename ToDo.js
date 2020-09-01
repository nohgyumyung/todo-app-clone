import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ToDo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [toDoValue, setToDoValue] = useState(props.text);
    // const [controlInput, setControlInput] = useState('');

    const toggleComplete = () => setIsCompleted(prevState => !prevState);
    const startEditing = () => setIsEditing(prevState => true, toDoValue => props.text); 
    const finishEditing = () => setIsEditing(prevState => false); // 글 저장을 위해 toggle 사용하지 않음
    // const controlInput = () => setToDoValue(toDoValue => props.text)

    return (
        <View style={styles.container}>

            <View style={styles.column}>
                <TouchableOpacity onPress={toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput 
                        style={[styles.input,
                            styles.text,
                            isCompleted ? styles.completedText: styles.uncompletedText]} 
                        value={toDoValue}
                        multiline={true}
                        onChangeText={toDoValue => setToDoValue(toDoValue)}
                        returnKeyType={'done'}
                        onBlur={finishEditing} // 칸 밖을 클릭하면 편집 종료
                    />) : (
                    <Text 
                        style={[styles.text,
                        isCompleted ? styles.completedText: styles.uncompletedText]}>
                        {props.text}
                    </Text>
                )}
            </View>

            {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={finishEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✅</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>🖊</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 60,
        borderBottomColor: '#928A97',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10, // width와 height의 절반
        borderWidth: 3,
        marginRight: 15
    },
    completedCircle: {
        borderColor: '#928A97'
    },
    uncompletedCircle: {
        borderColor: '#F85F73'
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 15
    },
    completedText: {
        color: '#928A97',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 250,
        justifyContent: 'space-between'
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        marginVertical: 10, // 터치 공간 확보
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width - 250,
    }
});
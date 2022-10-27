import React from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function Courses() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 3 }}>
            <ScrollView style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="cash"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 90 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="darkgray"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'gray',
        alignItems: 'center',
        width: 143
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})

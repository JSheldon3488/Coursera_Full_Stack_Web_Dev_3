import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Modal, Button} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postFavorite: (dishId) => dispatch(postFavorite(dishId)),
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
    }
}


function RenderDish(props) {
    const dish = props.dish;
    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.iconContainer}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color="#f50"
                        onPress={() => props.favorites ? console.log('Already favorite') : props.onPressHeart()}
                    />
                    <Icon 
                        raised
                        reverse
                        name={ 'pencil' }
                        type='font-awesome'
                        color="#512DA8"
                        onPress={() => {props.toggleModal()}}
                    />
                </View>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    readonly
                    startingValue={item.rating}
                    imageSize={15}
                    style={styles.commentRating}
                />                
                <Text style={{fontSize: 14}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return (
        <Card title="Comments">
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

class Dishdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        }
    }
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: ''
        });
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    showModal={this.state.showModal}
                    toggleModal={() => this.toggleModal()}
                    onPressHeart={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={{marginTop: 40}}>
                        <Rating
                            showRating
                            count={5}
                            defaultRating={3}
                            onFinishRating={(rating) => this.setState({rating: rating})}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Input 
                            placeholder=' Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o', solid: true}}
                            onChangeText={(text) => this.setState({author: text})}
                            containerStyle={{marginRight: 10}}
                                />
                        <Input 
                            placeholder=' Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            onChangeText={(text) => this.setState({comment: text})}
                        />
                    </View>
                    <View style={{margin: 15}}>
                        <Button 
                            onPress = {() => this.handleComment(dishId)}
                            color="#512DA8"
                            title="SUBMIT" 
                        />
                    </View>
                    <View style={{margin: 15}}>
                        <Button 
                            onPress = {() => {this.toggleModal(); this.resetForm()}}
                            color="grey"
                            title="CANCEL" 
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    commentRating: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-start',
        paddingVertical: 10,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
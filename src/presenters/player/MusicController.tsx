import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { useAppSelector } from '../../redux/actions/constants'
import Icon from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getVideos } from './getAudio'
import { SITE_COLOR } from '../../style'


export default function SongView({ navigation, route }) {

	const songState = useAppSelector(state => state.song);

	const [isPlaying, setIsPlaying] = React.useState(false)
	const [playbackInstance, setPlaybackInstance] = React.useState(null)
	const [currentIndex, setCurrentIndex] = React.useState(0)
	const [volume, setVolume] = React.useState(1.0)
	const [isBuffering, setIsBuffering] = React.useState(true)
	const [sound, setSound] = React.useState(null)

	React.useEffect(() => {
		if (route.params) {
			console.log(route.params)
			setCurrentIndex(route.params.index)
		}
	}, [route.params])


	React.useEffect(() => {
		
		//	getVideos();

		(async () => {
			try {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: false,

					playsInSilentModeIOS: true,

					shouldDuckAndroid: true,
					staysActiveInBackground: true,
					playThroughEarpieceAndroid: true
				})

				loadAudio()
			} catch (e) {
				console.log(e)
			}
		})();
	}, [currentIndex])
	

	const loadAudio = async () => {
	

		try {
			console.log('ssggs',songState.songs[currentIndex].song)
			console.log('ssggs',songState.songs[currentIndex].song_name)
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: `${songState.songs[currentIndex].song}`
			}

			const { sound } = await Audio.Sound.createAsync(
				source
			);

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			setPlaybackInstance(playbackInstance)
			setSound(sound)



			// playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			// await playbackInstance.loadAsync(source, status, false)
			// this.setState({
			// 	playbackInstance
			// })
		} catch (e) {
			console.log(e)
		}
	}

	const onPlaybackStatusUpdate = status => {
		setIsBuffering(status.isBuffering)

	}

	const handlePlayPause = async () => {


		//await sound.playAsync()
		// console.log('handlePlayPause', playbackInstance)
		// isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		console.log('handlePlayPause', sound)

		isPlaying ? await sound.pauseAsync() : await sound.playAsync()

		setIsPlaying(!isPlaying)

	}

	const handlePreviousTrack = async () => {


		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < songState.songs.length - 1 ?
				setCurrentIndex(currentIndex - 1) :
				setCurrentIndex(0)

			loadAudio()
		}
	}

	const handleNextTrack = async () => {

		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < songState.songs.length - 1 ? setCurrentIndex(currentIndex + 1) :
				setCurrentIndex(0)
			loadAudio()
		}
	}

	const renderFileInfo = () => {

		return (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{songState.songs[currentIndex].song_name}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{songState.songs[currentIndex].full_name}
				</Text>
				<Icon name='hearto' style={{ alignSelf: 'center', marginVertical: hp(1) }} size={40} color='#444' />
				{/* <Text style={[styles.trackInfoText, styles.smallText]}>
					{songState.songs[currentIndex].source}
				</Text> */}
			</View>
		)
	}


	return (
		<View style={styles.container}>
			<Image
				style={styles.albumCover}
				source={{ uri: songState.songs[currentIndex].cover_picture }}
			/>
			<View style={styles.controls}>
				<TouchableOpacity style={styles.control} onPress={() => handlePreviousTrack()}>
					<Icon name='stepbackward' size={48} color='#444' />
				</TouchableOpacity>
				{
					sound ?
						<TouchableOpacity style={styles.control} onPress={() => handlePlayPause()}>
							{isPlaying ? (
								<Icon name='pausecircle' size={48} color='#444' />
							) : (
								<Icon name='play' size={48} color='#444' />
							)}
						</TouchableOpacity>
						:
						<ActivityIndicator size='large' color={SITE_COLOR} />
				}

				<TouchableOpacity style={styles.control} onPress={() => handleNextTrack()}>
					<Icon name='stepforward' size={48} color='#444' />
				</TouchableOpacity>
			</View>
			{renderFileInfo()}
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: wp('90%'),
		height: hp('60%'),
		borderRadius: 10,
	},
	trackInfo: {
		padding: 20,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: hp(3),
		marginBottom: hp(1),
		letterSpacing: 1.5,
		fontFamily: 'gilroy-bold'
	},
	smallText: {
		fontSize: hp(2),
		fontFamily: 'gilroy-regular',
		letterSpacing: 1.5
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
})
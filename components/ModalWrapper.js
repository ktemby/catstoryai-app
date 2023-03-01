import { View, Pressable, Modal } from "react-native";
import styles from "../views/Styles";

let ModalWrapper = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal transparent={true} visible={props.showModal}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.setShowModal(false)}
        >
          <View style={styles.modalStyle}>
            <Pressable style={{ width: "100%" }}>
              <View style={{ alignItems: "center" }}>{props.children}</View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalWrapper;

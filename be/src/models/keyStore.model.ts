import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { User } from '../models/user.model'

export class KeyStore {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  publicKey: string

  @prop({ required: true })
  privateKey: string
}

const KeyStoreModel = getModelForClass(KeyStore, {
  schemaOptions: {
    collection: 'KeyStore',
    timestamps: true
  }
})

export default KeyStoreModel

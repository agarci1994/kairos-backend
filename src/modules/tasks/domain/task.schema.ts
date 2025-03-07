import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from 'src/common/enums';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  originalPath: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.Pending })
  status: TaskStatus;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [{ resolution: String, path: String }], _id: false })
  images?: { resolution: string; path: string }[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);

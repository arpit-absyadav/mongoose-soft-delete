// /*
//  * @Author: Arpit Yadav
//  * @Date: 2019-07-23 21:04:02
//  * @Last Modified by: Arpit Yadav
//  * @Last Modified time: 2019-07-23 21:34:11
//  */
// /* eslint-disable array-callback-return */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-shadow */
// /* eslint-disable no-undef */
// const should = require('chai').should();
// const { expect } = require('chai');
// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const mongoose_delete = require('../');

// before((done) => {
//   mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/mongoose_plugin', { useNewUrlParser: true });
//   done();
// });

// after((done) => {
//   mongoose.disconnect();
//   done();
// });


// describe('mongoose_delete delete method without callback function', () => {
//   const Test1Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test0' });
//   Test1Schema.plugin(mongoose_delete);
//   const Test0 = mongoose.model('Test0', Test1Schema);

//   before((done) => {
//     const puffy = new Test0({ name: 'Puffy' });

//     puffy.save(() => {
//       done();
//     });
//   });

//   // after((done) => {
//   //   mongoose.connection.db.dropCollection('mongoose_delete_test0', () => {
//   //     done();
//   //   });
//   // });

//   it('destroy() -> should return a thenable (Promise)', (done) => {
//     Test0.findOne({ name: 'Puffy' }, (err, puffy) => {
//       should.not.exist(err);

//       expect(puffy.destroy()).to.have.property('then');
//       done();
//     });
//   });
// });

// describe('mongoose_delete plugin without options', () => {
//   const Test1Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test1' });
//   Test1Schema.plugin(mongoose_delete);
//   const Test1 = mongoose.model('Test1', Test1Schema);
//   const puffy1 = new Test1({ name: 'Puffy1' });
//   const puffy2 = new Test1({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test1', () => {
//       done();
//     });
//   });

//   it('destroy() -> should set deleted:true', (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(true);
//         done();
//       });
//     });
//   });

//   it("destroy() -> should not save 'deletedAt' value", (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         should.not.exist(success.deletedAt);
//         done();
//       });
//     });
//   });

//   it("destroyById() -> should set deleted:true and not save 'deletedAt'", (done) => {
//     Test1.destroyById(puffy2._id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test1.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         should.not.exist(doc.deletedAt);
//         done();
//       });
//     });
//   });

//   it('destroyById() -> should throws exception: first argument error', (done) => {
//     const errMessage = 'First argument is mandatory and must not be a function.';
//     expect(Test1.destroyById).to.throw(errMessage);
//     expect(() => { Test1.destroyById(() => {}); }).to.throw(errMessage);
//     done();
//   });

//   it('restore() -> should set deleted:false', (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete plugin without options, using option: typeKey', () => {
//   const Test1Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test1', typeKey: '$type' });
//   Test1Schema.plugin(mongoose_delete);
//   const Test1 = mongoose.model('Test1a', Test1Schema);
//   const puffy1 = new Test1({ name: 'Puffy1' });
//   const puffy2 = new Test1({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test1', () => {
//       done();
//     });
//   });

//   it('destroy() -> should set deleted:true', (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(true);
//         done();
//       });
//     });
//   });

//   it("destroy() -> should not save 'deletedAt' value", (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         should.not.exist(success.deletedAt);
//         done();
//       });
//     });
//   });

//   it("destroyById() -> should set deleted:true and not save 'deletedAt'", (done) => {
//     Test1.destroyById(puffy2._id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test1.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         should.not.exist(doc.deletedAt);
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false', (done) => {
//     Test1.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete with options: { deletedAt : true }', () => {
//   const Test2Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test2' });
//   Test2Schema.plugin(mongoose_delete, { deletedAt: true });
//   const Test2 = mongoose.model('Test2', Test2Schema);
//   const puffy1 = new Test2({ name: 'Puffy1' });
//   const puffy2 = new Test2({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test2', () => {
//       done();
//     });
//   });

//   it("destroy() -> should save 'deletedAt' key", (done) => {
//     Test2.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         should.exist(success.deletedAt);
//         done();
//       });
//     });
//   });

//   it("destroyById() -> should save 'deletedAt' key", (done) => {
//     Test2.destroyById(puffy2._id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test2.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         should.exist(doc.deletedAt);
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false and delete deletedAt key', (done) => {
//     Test2.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         should.not.exist(success.deletedAt);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete with options: { deletedAt : true }, using option: typeKey', () => {
//   const Test2Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test2', typeKey: '$type' });
//   Test2Schema.plugin(mongoose_delete, { deletedAt: true });
//   const Test2 = mongoose.model('Test2a', Test2Schema);
//   const puffy1 = new Test2({ name: 'Puffy1' });
//   const puffy2 = new Test2({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test2', () => {
//       done();
//     });
//   });

//   it("destroy() -> should save 'deletedAt' key", (done) => {
//     Test2.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy((err, success) => {
//         if (err) {
//           throw err;
//         }
//         should.exist(success.deletedAt);
//         done();
//       });
//     });
//   });

//   it("destroyById() -> should save 'deletedAt' key", (done) => {
//     Test2.destroyById(puffy2._id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test2.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         should.exist(doc.deletedAt);
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false and delete deletedAt key', (done) => {
//     Test2.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         should.not.exist(success.deletedAt);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete with options: { deletedBy : true }', () => {
//   const Test3Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test3' });
//   Test3Schema.plugin(mongoose_delete, { deletedBy: true });
//   const Test3 = mongoose.model('Test3', Test3Schema);
//   const puffy1 = new Test3({ name: 'Puffy1' });
//   const puffy2 = new Test3({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test3', () => {
//       done();
//     });
//   });

//   const id = mongoose.Types.ObjectId('53da93b16b4a6670076b16bf');

//   it("destroy() -> should save 'deletedBy' key", (done) => {
//     Test3.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy(id, (err, success) => {
//         should.not.exist(err);

//         success.deletedBy.should.equal(id);
//         done();
//       });
//     });
//   });

//   it('destroyById() -> should save `deletedBy` key', (done) => {
//     Test3.destroyById(puffy2._id, id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test3.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         doc.deletedBy.toString().should.equal(id.toString());
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false and delete `deletedBy` key', (done) => {
//     Test3.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         should.not.exist(success.deletedBy);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete with options: { deletedBy : true }, using option: typeKey', () => {
//   const Test3Schema = new Schema({ name: String }, { collection: 'mongoose_delete_test3', typeKey: '$type' });
//   Test3Schema.plugin(mongoose_delete, { deletedBy: true });
//   const Test3 = mongoose.model('Test3a', Test3Schema);
//   const puffy1 = new Test3({ name: 'Puffy1' });
//   const puffy2 = new Test3({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test3', () => {
//       done();
//     });
//   });

//   const id = mongoose.Types.ObjectId('53da93b16b4a6670076b16bf');

//   it('destroy() -> should save `deletedBy` key', (done) => {
//     Test3.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy(id, (err, success) => {
//         should.not.exist(err);

//         success.deletedBy.should.equal(id);
//         done();
//       });
//     });
//   });

//   it('destroyById() -> should save deletedBy key', (done) => {
//     Test3.destroyById(puffy2._id, id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test3.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         doc.deletedBy.toString().should.equal(id.toString());
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false and delete deletedBy key', (done) => {
//     Test3.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         should.not.exist(success.deletedBy);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete with options: { deletedBy : true, deletedByType: String }', () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { deletedBy: true, deletedByType: String });
//   const Test = mongoose.model('TestDeletedByType', TestSchema);
//   const puffy1 = new Test({ name: 'Puffy1' });
//   const puffy2 = new Test({ name: 'Puffy2' });

//   before((done) => {
//     puffy1.save(() => {
//       puffy2.save(() => {
//         done();
//       });
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test', () => {
//       done();
//     });
//   });

//   const id = 'custom_user_id_12345678';

//   it('destroy() -> should save deletedBy key', (done) => {
//     Test.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.destroy(id, (err, success) => {
//         should.not.exist(err);

//         success.deletedBy.should.equal(id);
//         done();
//       });
//     });
//   });

//   it('destroyById() -> should save deletedBy key', (done) => {
//     Test.destroyById(puffy2._id, id, (err, documents) => {
//       should.not.exist(err);
//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       Test.findOne({ name: 'Puffy2' }, (err, doc) => {
//         should.not.exist(err);
//         doc.deleted.should.equal(true);
//         doc.deletedBy.should.equal(id);
//         done();
//       });
//     });
//   });

//   it('restore() -> should set deleted:false and delete deletedBy key', (done) => {
//     Test.findOne({ name: 'Puffy1' }, (err, puffy) => {
//       should.not.exist(err);

//       puffy.restore((err, success) => {
//         if (err) {
//           throw err;
//         }
//         success.deleted.should.equal(false);
//         should.not.exist(success.deletedBy);
//         done();
//       });
//     });
//   });
// });

// describe('check not overridden static methods', () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete);
//   const TestModel = mongoose.model('Test4', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', deleted: true },
//         { name: 'Darth Vader' },
//         { name: 'Luke Skywalker' },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test', done);
//   });

//   it('count() -> should return 3 documents', (done) => {
//     TestModel.count((err, count) => {
//       should.not.exist(err);

//       count.should.equal(3);
//       done();
//     });
//   });

//   it('countDocuments() -> should return 3 documents', (done) => {
//     // INFO: countDocuments is added in mongoose 5.x
//     if (typeof TestModel.countDocuments === 'function') {
//       TestModel.countDocuments((err, count) => {
//         should.not.exist(err);

//         count.should.equal(3);
//         done();
//       });
//     } else {
//       done();
//     }
//   });

//   it('find() -> should return 3 documents', (done) => {
//     TestModel.find((err, documents) => {
//       should.not.exist(err);

//       documents.length.should.equal(3);
//       done();
//     });
//   });

//   it('findOne() -> should return 1 deleted document', (done) => {
//     TestModel.findOne({ name: 'Obi-Wan Kenobi' }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       doc.deleted.should.equal(true);
//       done();
//     });
//   });

//   it('findOneAndUpdate() -> should find and update deleted document', (done) => {
//     TestModel.findOneAndUpdate({ name: 'Obi-Wan Kenobi' }, { name: 'Obi-Wan Kenobi Test' }, { new: true }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       doc.name.should.equal('Obi-Wan Kenobi Test');
//       done();
//     });
//   });

//   it('update() -> should update deleted document', (done) => {
//     TestModel.update({ name: 'Obi-Wan Kenobi' }, { name: 'Obi-Wan Kenobi Test' }, (err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(1);
//       done();
//     });
//   });
// });

// describe("check overridden static methods: { overrideMethods: 'all' }", () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
//   const TestModel = mongoose.model('Test5', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', deleted: true },
//         { name: 'Darth Vader' },
//         { name: 'Luke Skywalker', deleted: true },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test', done);
//   });

//   it('count() -> should return 1 documents', (done) => {
//     TestModel.count((err, count) => {
//       should.not.exist(err);

//       count.should.equal(1);
//       done();
//     });
//   });

//   it('countDeleted() -> should return 2 deleted documents', (done) => {
//     TestModel.countDeleted((err, count) => {
//       should.not.exist(err);

//       count.should.equal(2);
//       done();
//     });
//   });

//   it('countWithDeleted() -> should return 3 documents', (done) => {
//     TestModel.countWithDeleted((err, count) => {
//       should.not.exist(err);

//       count.should.equal(3);
//       done();
//     });
//   });

//   it('find() -> should return 1 documents', (done) => {
//     TestModel.find((err, documents) => {
//       should.not.exist(err);

//       documents.length.should.equal(1);
//       done();
//     });
//   });

//   it('findDeleted() -> should return 2 documents', (done) => {
//     TestModel.findDeleted((err, documents) => {
//       should.not.exist(err);

//       documents.length.should.equal(2);
//       done();
//     });
//   });

//   it('findWithDeleted() -> should return 3 documents', (done) => {
//     TestModel.findWithDeleted((err, documents) => {
//       should.not.exist(err);

//       documents.length.should.equal(3);
//       done();
//     });
//   });

//   it('findOne() -> should not return 1 deleted document', (done) => {
//     TestModel.findOne({ name: 'Obi-Wan Kenobi' }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).to.be.null;
//       done();
//     });
//   });

//   it('findOneDeleted() -> should return 1 deleted document', (done) => {
//     TestModel.findOneDeleted({ name: 'Obi-Wan Kenobi' }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('findOneWithDeleted() -> should return 1 deleted document', (done) => {
//     TestModel.findOneWithDeleted({ name: 'Obi-Wan Kenobi' }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('findOneWithDeleted() -> should return 1 not deleted document', (done) => {
//     TestModel.findOneWithDeleted({ name: 'Darth Vader' }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('findOneAndUpdate() -> should not find and update deleted document', (done) => {
//     TestModel.findOneAndUpdate({ name: 'Obi-Wan Kenobi' }, { name: 'Obi-Wan Kenobi Test' }, { new: true }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).to.be.null;
//       done();
//     });
//   });

//   it('findOneAndUpdateDeleted() -> should find and update deleted document', (done) => {
//     TestModel.findOneAndUpdateDeleted({ name: 'Obi-Wan Kenobi' }, { name: 'Obi-Wan Kenobi Test' }, { new: true }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('findOneAndUpdateWithDeleted() -> should find and update deleted document', (done) => {
//     TestModel.findOneAndUpdateWithDeleted({ name: 'Obi-Wan Kenobi' }, { name: 'Obi-Wan Kenobi Test' }, { new: true }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('findOneAndUpdateWithDeleted() -> should find and update not deleted document', (done) => {
//     TestModel.findOneAndUpdateWithDeleted({ name: 'Darth Vader' }, { name: 'Darth Vader Test' }, { new: true }, (err, doc) => {
//       should.not.exist(err);

//       expect(doc).not.to.be.null;
//       done();
//     });
//   });

//   it('update(conditions, update, options, callback) -> should not update deleted documents', (done) => {
//     TestModel.update({}, { name: 'Luke Skywalker Test' }, { multi: true }, (err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(1);
//       done();
//     });
//   });

//   it('update(conditions, update, options) -> should not update deleted documents', (done) => {
//     TestModel.update({}, { name: 'Luke Skywalker Test' }, { multi: true }).exec((err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(1);
//       done();
//     });
//   });

//   it('update(conditions, update, callback) -> should not update deleted documents', (done) => {
//     TestModel.update({}, { name: 'Luke Skywalker Test' }, (err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(1);
//       done();
//     });
//   });

//   it('update(conditions, update) -> should not update deleted documents', (done) => {
//     TestModel.update({}, { name: 'Luke Skywalker Test' }).exec((err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(1);
//       done();
//     });
//   });

//   it('updateDeleted() -> should update deleted document', (done) => {
//     TestModel.updateDeleted({}, { name: 'Test 123' }, { multi: true }, (err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(2);
//       done();
//     });
//   });

//   it('updateWithDeleted() -> should update all document', (done) => {
//     TestModel.updateWithDeleted({}, { name: 'Test 654' }, { multi: true }, (err, doc) => {
//       should.not.exist(err);

//       doc.ok.should.equal(1);
//       doc.n.should.equal(3);
//       done();
//     });
//   });
// });

// describe('check the existence of override static methods: { overrideMethods: true }', () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: true });
//   const TestModel = mongoose.model('Test6', TestSchema);

//   it('count() -> method should exist', (done) => {
//     expect(TestModel.count).to.exist;
//     done();
//   });

//   it('countDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDeleted).to.exist;
//     done();
//   });

//   it('countWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countWithDeleted).to.exist;
//     done();
//   });

//   it('countDocuments() -> method should exist', (done) => {
//     expect(TestModel.countDocuments).to.exist;
//     done();
//   });

//   it('countDocumentsDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsDeleted).to.exist;
//     done();
//   });

//   it('countDocumentsWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsWithDeleted).to.exist;
//     done();
//   });

//   it('find() -> method should exist', (done) => {
//     expect(TestModel.find).to.exist;
//     done();
//   });

//   it('findDeleted() -> method should exist', (done) => {
//     expect(TestModel.findDeleted).to.exist;
//     done();
//   });

//   it('findWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findWithDeleted).to.exist;
//     done();
//   });

//   it('findOne() -> method should exist', (done) => {
//     expect(TestModel.findOne).to.exist;
//     done();
//   });

//   it('findOneDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneDeleted).to.exist;
//     done();
//   });

//   it('findOneWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneWithDeleted).to.exist;
//     done();
//   });

//   it('findOneAndUpdate() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdate).to.exist;
//     done();
//   });

//   it('findOneAndUpdateDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateDeleted).to.exist;
//     done();
//   });

//   it('findOneAndUpdateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateWithDeleted).to.exist;
//     done();
//   });

//   it('update() -> method should exist', (done) => {
//     expect(TestModel.update).to.exist;
//     done();
//   });

//   it('updateDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateDeleted).to.exist;
//     done();
//   });

//   it('updateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateWithDeleted).to.exist;
//     done();
//   });
// });

// describe("check the existence of override static methods: { overrideMethods: ['testError', 'count', 'countDocuments', 'find', 'findOne', 'findOneAndUpdate', 'update'] }", () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: ['testError', 'count', 'countDocuments', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
//   const TestModel = mongoose.model('Test7', TestSchema);

//   it('testError() -> method should not exist', (done) => {
//     expect(TestModel.testError).to.not.exist;
//     done();
//   });

//   it('count() -> method should exist', (done) => {
//     expect(TestModel.count).to.exist;
//     done();
//   });

//   it('countDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDeleted).to.exist;
//     done();
//   });

//   it('countWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countWithDeleted).to.exist;
//     done();
//   });

//   it('countDocuments() -> method should exist', (done) => {
//     expect(TestModel.countDocuments).to.exist;
//     done();
//   });

//   it('countDocumentsDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsDeleted).to.exist;
//     done();
//   });

//   it('countDocumentsWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsWithDeleted).to.exist;
//     done();
//   });

//   it('find() -> method should exist', (done) => {
//     expect(TestModel.find).to.exist;
//     done();
//   });

//   it('findDeleted() -> method should exist', (done) => {
//     expect(TestModel.findDeleted).to.exist;
//     done();
//   });

//   it('findWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findWithDeleted).to.exist;
//     done();
//   });

//   it('findOne() -> method should exist', (done) => {
//     expect(TestModel.findOne).to.exist;
//     done();
//   });

//   it('findOneDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneDeleted).to.exist;
//     done();
//   });

//   it('findOneWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneWithDeleted).to.exist;
//     done();
//   });

//   it('findOneAndUpdate() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdate).to.exist;
//     done();
//   });

//   it('findOneAndUpdateDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateDeleted).to.exist;
//     done();
//   });

//   it('findOneAndUpdateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateWithDeleted).to.exist;
//     done();
//   });

//   it('update() -> method should exist', (done) => {
//     expect(TestModel.update).to.exist;
//     done();
//   });

//   it('updateDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateDeleted).to.exist;
//     done();
//   });

//   it('updateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateWithDeleted).to.exist;
//     done();
//   });
// });

// describe("check the existence of override static methods: { overrideMethods: ['count', 'find'] }", () => {
//   const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'countDocuments', 'find'] });
//   const TestModel = mongoose.model('Test8', TestSchema);

//   it('testError() -> method should not exist', (done) => {
//     expect(TestModel.testError).to.not.exist;
//     done();
//   });

//   it('count() -> method should exist', (done) => {
//     expect(TestModel.count).to.exist;
//     done();
//   });

//   it('countDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDeleted).to.exist;
//     done();
//   });

//   it('countWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countWithDeleted).to.exist;
//     done();
//   });

//   it('countDocuments() -> method should exist', (done) => {
//     expect(TestModel.countDocuments).to.exist;
//     done();
//   });

//   it('countDocumentsDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsDeleted).to.exist;
//     done();
//   });

//   it('countDocumentsWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.countDocumentsWithDeleted).to.exist;
//     done();
//   });

//   it('find() -> method should exist', (done) => {
//     expect(TestModel.find).to.exist;
//     done();
//   });

//   it('findDeleted() -> method should exist', (done) => {
//     expect(TestModel.findDeleted).to.exist;
//     done();
//   });

//   it('findWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findWithDeleted).to.exist;
//     done();
//   });

//   it('findOne() -> method should exist', (done) => {
//     expect(TestModel.findOne).to.exist;
//     done();
//   });

//   it('findOneDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneDeleted).to.not.exist;
//     done();
//   });

//   it('findOneWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneWithDeleted).to.not.exist;
//     done();
//   });

//   it('findOneAndUpdate() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdate).to.exist;
//     done();
//   });

//   it('findOneAndUpdateDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateDeleted).to.not.exist;
//     done();
//   });

//   it('findOneAndUpdateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.findOneAndUpdateWithDeleted).to.not.exist;
//     done();
//   });

//   it('update() -> method should exist', (done) => {
//     expect(TestModel.update).to.exist;
//     done();
//   });

//   it('updateDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateDeleted).to.not.exist;
//     done();
//   });

//   it('updateWithDeleted() -> method should exist', (done) => {
//     expect(TestModel.updateWithDeleted).to.not.exist;
//     done();
//   });
// });

// describe('delete multiple documents', () => {
//   const TestSchema = new Schema({ name: String, side: Number }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });
//   const TestModel = mongoose.model('Test14', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', side: 0 },
//         { name: 'Darth Vader', side: 1 },
//         { name: 'Luke Skywalker', side: 0 },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test', done);
//   });

//   it('destroy(cb) -> delete multiple documents', (done) => {
//     TestModel.destroy((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });

//   it('destroy(query, cb) -> delete multiple documents with conditions', (done) => {
//     TestModel.destroy({ side: 0 }, (err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(2);

//       done();
//     });
//   });


//   it('destroy(query, deletedBy, cb) -> delete multiple documents with conditions and user ID', (done) => {
//     const userId = mongoose.Types.ObjectId('53da93b16b4a6670076b16bf');

//     TestModel.destroy({ side: 1 }, userId, (err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       done();
//     });
//   });

//   it('destroy().exec() -> delete all documents', (done) => {
//     TestModel.destroy().exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });

//   it('destroy(query).exec() -> delete multiple documents with conditions', (done) => {
//     TestModel.destroy({ side: 0 }).exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(2);

//       done();
//     });
//   });

//   it('destroy(query, deletedBy).exec() -> delete multiple documents with conditions and user ID', (done) => {
//     const userId = mongoose.Types.ObjectId('53da93b16b4a6670076b16bf');

//     TestModel.destroy({ side: 1 }, userId).exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(1);

//       done();
//     });
//   });

//   it('destroy({}, deletedBy).exec() -> delete all documents passing user ID', (done) => {
//     const userId = mongoose.Types.ObjectId('53da93b16b4a6670076b16bf');

//     TestModel.destroy({}, userId).exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });
// });

// describe('delete multiple documents (no plugin options)', () => {
//   const TestSchema = new Schema({ name: String, side: Number }, { collection: 'mongoose_delete_test' });
//   TestSchema.plugin(mongoose_delete);
//   const TestModel = mongoose.model('Test13', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', side: 0 },
//         { name: 'Darth Vader', side: 1 },
//         { name: 'Luke Skywalker', side: 0 },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_delete_test', done);
//   });

//   it('destroy(cb) -> delete multiple documents', (done) => {
//     TestModel.destroy((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });
// });

// describe('restore multiple documents', () => {
//   const TestSchema = new Schema({ name: String, side: Number }, { collection: 'mongoose_restore_test' });
//   TestSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });
//   const TestModel = mongoose.model('Test15', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', side: 0 },
//         { name: 'Darth Vader', side: 1, deleted: true },
//         { name: 'Luke Skywalker', side: 0 },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_restore_test', done);
//   });

//   it('restore(cb) -> restore all documents', (done) => {
//     TestModel.restore((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });

//   it('restore(query, cb) -> restore multiple documents with conditions', (done) => {
//     TestModel.restore({ side: 0 }, (err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(2);

//       done();
//     });
//   });

//   it('restore().exec() -> restore all documents', (done) => {
//     TestModel.restore().exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });

//   it('restore(query).exec() -> restore multiple documents with conditions', (done) => {
//     TestModel.restore({ side: 0 }).exec((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(2);

//       done();
//     });
//   });
// });

// describe('restore multiple documents (no plugin options)', () => {
//   const TestSchema = new Schema({ name: String, side: Number }, { collection: 'mongoose_restore_test' });
//   TestSchema.plugin(mongoose_delete);
//   const TestModel = mongoose.model('Test16', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Obi-Wan Kenobi', side: 0 },
//         { name: 'Darth Vader', side: 1, deleted: true },
//         { name: 'Luke Skywalker', side: 0 },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_restore_test', done);
//   });

//   it('restore(cb) -> restore all documents', (done) => {
//     TestModel.restore((err, documents) => {
//       should.not.exist(err);

//       documents.ok.should.equal(1);
//       documents.n.should.equal(3);

//       done();
//     });
//   });
// });

// describe('model validation on delete (default): { validateBeforeDelete: true }', () => {
//   const TestSchema = new Schema({
//     name: { type: String, required: true },
//   }, { collection: 'mongoose_restore_test' });
//   TestSchema.plugin(mongoose_delete);
//   const TestModel = mongoose.model('Test17', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Luke Skywalker' },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_restore_test', done);
//   });

//   it('destroy() -> should raise ValidationError error', (done) => {
//     TestModel.findOne({ name: 'Luke Skywalker' }, (err, luke) => {
//       should.not.exist(err);
//       luke.name = '';

//       luke.destroy((err) => {
//         err.should.exist;
//         err.name.should.exist;
//         err.name.should.equal('ValidationError');
//         done();
//       });
//     });
//   });

//   it('destroy() -> should not raise ValidationError error', (done) => {
//     TestModel.findOne({ name: 'Luke Skywalker' }, (err, luke) => {
//       should.not.exist(err);
//       luke.name = 'Test Name';

//       luke.destroy((err) => {
//         should.not.exist(err);
//         done();
//       });
//     });
//   });
// });

// describe('model validation on delete: { validateBeforeDelete: false }', () => {
//   const TestSchema = new Schema({
//     name: { type: String, required: true },
//   }, { collection: 'mongoose_restore_test' });
//   TestSchema.plugin(mongoose_delete, { validateBeforeDelete: false });
//   const TestModel = mongoose.model('Test18', TestSchema);

//   beforeEach((done) => {
//     TestModel.create(
//       [
//         { name: 'Luke Skywalker' },
//       ], done,
//     );
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection('mongoose_restore_test', done);
//   });

//   it('destroy() -> should not raise ValidationError error', (done) => {
//     TestModel.findOne({ name: 'Luke Skywalker' }, (err, luke) => {
//       should.not.exist(err);
//       luke.name = '';

//       luke.destroy((err) => {
//         should.not.exist(err);
//         done();
//       });
//     });
//   });

//   it('destroy() -> should not raise ValidationError error', (done) => {
//     TestModel.findOne({ name: 'Luke Skywalker' }, (err, luke) => {
//       should.not.exist(err);
//       luke.name = 'Test Name';

//       luke.destroy((err) => {
//         should.not.exist(err);
//         done();
//       });
//     });
//   });
// });

// describe('mongoose_delete indexFields options', () => {
//   it('all fields must have index: { indexFields: true }', (done) => {
//     const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test_indexFields' });
//     TestSchema.plugin(mongoose_delete, { indexFields: true, deletedAt: true, deletedBy: true });
//     const Test0 = mongoose.model('Test0_indexFields', TestSchema);

//     expect(Test0.schema.paths.deleted._index).to.be.true;
//     expect(Test0.schema.paths.deletedAt._index).to.be.true;
//     expect(Test0.schema.paths.deletedBy._index).to.be.true;
//     done();
//   });

//   it("all fields must have index: { indexFields: 'all' }", (done) => {
//     const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test_indexFields' });
//     TestSchema.plugin(mongoose_delete, { indexFields: 'all', deletedAt: true, deletedBy: true });
//     const Test0 = mongoose.model('Test1_indexFields', TestSchema);

//     expect(Test0.schema.paths.deleted._index).to.be.true;
//     expect(Test0.schema.paths.deletedAt._index).to.be.true;
//     expect(Test0.schema.paths.deletedBy._index).to.be.true;
//     done();
//   });

//   it("only 'deleted' field must have index: { indexFields: ['deleted'] }", (done) => {
//     const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test_indexFields' });
//     TestSchema.plugin(mongoose_delete, { indexFields: ['deleted'], deletedAt: true, deletedBy: true });
//     const Test0 = mongoose.model('Test2_indexFields', TestSchema);

//     expect(Test0.schema.paths.deleted._index).to.be.true;
//     done();
//   });

//   it("only 'deletedAt' and 'deletedBy' fields must have index: { indexFields: ['deletedAt', 'deletedBy'] }", (done) => {
//     const TestSchema = new Schema({ name: String }, { collection: 'mongoose_delete_test_indexFields' });
//     TestSchema.plugin(mongoose_delete, { indexFields: ['deletedAt', 'deletedBy'], deletedAt: true, deletedBy: true });
//     const Test0 = mongoose.model('Test3_indexFields', TestSchema);

//     expect(Test0.schema.paths.deleted._index).to.be.false;
//     expect(Test0.schema.paths.deletedAt._index).to.be.true;
//     expect(Test0.schema.paths.deletedBy._index).to.be.true;
//     done();
//   });
// });

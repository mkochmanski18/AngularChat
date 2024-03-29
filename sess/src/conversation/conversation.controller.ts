import { Body, Controller, Delete, Get, HttpException, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { AuthenticatedGuard, ConversationOwnerGuard, UserIdentityGuard } from 'src/auth/Guards';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { Conversation } from './conversation.entity';
import { ConversationService } from './conversation.service';
import { ConversationDto, ConversationWithPDto } from './dto/conversation.dto';

@ApiTags('conversation')
@Controller('conversation')
export class ConversationController {
    constructor(
        @Inject(ConversationService) private conversationService: ConversationService,
    ){}

    //Show all user's group conversations
    @UseGuards(AuthenticatedGuard,UserIdentityGuard)
    @Get('user/:userid')
    @ApiOperation({ summary: 'Show all informations about group conversations' })
    @ApiResponse({ status: 200, description: 'Conversation downloaded.'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    getUserConversations(
        @Param('userid') userid:string, 
    ):Promise<HttpException|User[]|Conversation[]>{
        return this.conversationService.getUserConversations(userid);
    }

     //Show all messages in conversation
    @UseGuards(AuthenticatedGuard)
    @Get('user/:uid/:fid')
    @ApiOperation({ summary: 'Show conversation by UID and FID' })
    @ApiResponse({ status: 200, description: 'Messages downloaded.'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    getConversationByUID(
        @Param('uid') uid:string, 
        @Param('fid') fid:string, 
    ): Promise<any>{
        return this.conversationService.getConversationByUID(uid,fid);
    }

    //Show all informations about conversation
    @UseGuards(AuthenticatedGuard)
    @Get(':conversationid')
    @ApiOperation({ summary: 'Show all informations about conversation' })
    @ApiResponse({ status: 200, description: 'Conversation downloaded.'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    getConversation(
        @Param('conversationid') conversationid:string, 
    ):Promise<HttpException|Conversation>{
        return this.conversationService.getConversation(conversationid);
    }
    
    //Show all messages in conversation
    @UseGuards(AuthenticatedGuard)
    @Get('messages/:conversationid')
    @ApiOperation({ summary: 'Show messages in conversation' })
    @ApiResponse({ status: 200, description: 'Messages downloaded.'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    getMessages(
        @Param('conversationid') conversationid:string, 
    ):Promise<HttpException|Message[]>{
        return this.conversationService.getMessages(conversationid);
    }
    //Show all participants conversation
    @UseGuards(AuthenticatedGuard)
    @Get('participants/:conversationid')
    @ApiOperation({ summary: 'Show conversation participants ' })
    @ApiResponse({ status: 200, description: 'Participants downloaded.'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    getParticipants(
        @Param('conversationid') conversationid:string, 
    ):Promise<HttpException|Conversation>{
        return this.conversationService.getParticipants(conversationid);
    }

    //Create Conversation
    @UseGuards(AuthenticatedGuard,UserIdentityGuard)
    @Post('empty')
    @ApiOperation({ summary: 'Create new Conversation without participants' })
    @ApiResponse({ status: 201, description: 'Conversation created.'})
    @ApiResponse({ status: 404, description: "Participant doesn't exist"})
    createConversation(
        @Body() body:ConversationDto, 
    ):Promise<HttpException|Conversation>{
        return this.conversationService.createConversation(body);
    }

    //Create Conversation
    @UseGuards(AuthenticatedGuard,UserIdentityGuard)
    @Post('participants')
    @ApiOperation({ summary: 'Create new Conversation with participants' })
    @ApiResponse({ status: 201, description: 'Conversation created.'})
    @ApiResponse({ status: 404, description: "Participant doesn't exist"})
    createConversationWithParticipants(
        @Body() body:ConversationWithPDto, 
    ):Promise<HttpException|Conversation>{
        return this.conversationService.createConversationWithParticipants(body);
    }

    //Delete Conversation
    @UseGuards(AuthenticatedGuard,ConversationOwnerGuard)
    @Delete(':conversationid')
    @ApiOperation({ summary: 'Delete Conversation' })
    @ApiResponse({ status: 200, description: 'Conversation deleted'})
    @ApiResponse({ status: 403, description: "Conversation can't be deleted!"})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    deleteConversation(
        @Param('conversationid') conversationid:string, 
    ):Promise<HttpException>{
        return this.conversationService.deleteConversation(conversationid);
    }

    //Change Conversation name
    @UseGuards(AuthenticatedGuard,ConversationOwnerGuard)
    @Patch('name')
    @ApiOperation({ summary: 'Change Conversation name' })
    @ApiResponse({ status: 200, description: 'Conversation name changed'})
    @ApiResponse({ status: 404, description: "Conversation doesn't exist"})
    changeName(
        @Query('conversationid') conversationid:string,
        @Query('newname') newname:string, 
    ):Promise<HttpException>{
        return this.conversationService.changeName(conversationid,newname);
    }

    //Add new Participant to conversation
    @UseGuards(AuthenticatedGuard,ConversationOwnerGuard)
    @Patch('participants')
    @ApiOperation({ summary: 'Add new Participant to conversation' })
    @ApiResponse({ status: 200, description: 'Participant has been added'})
    @ApiResponse({ status: 404, description: "Conversation/Participant doesn't exist"})
    addParticipant(
        @Query('conversationid') conversationid:string,
        @Query('participantid') participantid:string, 
    ):Promise<HttpException>{
        return this.conversationService.addParticipant(conversationid,participantid);
    }

    //Change conversation's owner
    @UseGuards(AuthenticatedGuard,ConversationOwnerGuard)
    @Patch('owner')
    @ApiOperation({ summary: 'Change conversations owner' })
    @ApiResponse({ status: 200, description: 'PArticipant has been added'})
    @ApiResponse({ status: 404, description: "Conversation/User doesn't exist"})
    changeOwner(
        @Query('conversationid') conversationid:string,
        @Query('userid') userid:string, 
    ):Promise<HttpException>{
        return this.conversationService.changeOwner(conversationid,userid);
    }

    //Delete Participant from conversation
    @UseGuards(AuthenticatedGuard,ConversationOwnerGuard)
    @Delete('participants')
    @ApiOperation({ summary: 'Delete participant from Conversation' })
    @ApiResponse({ status: 200, description: 'Participant deleted'})
    @ApiResponse({ status: 404, description: "Conversation/Participant doesn't exist"})
    deleteParticipant(
        @Query('conversationid') conversationid:string,
        @Query('participantid') participantid:string, 
    ):Promise<HttpException>{
        return this.conversationService.deleteParticipant(conversationid,participantid);
    }


}